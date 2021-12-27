import { OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/services/user.service';
import { ChannelI } from '../interface/channel.interface';
import { ConnectedUserI } from '../interface/connected-user.interface';
import { JoinedChannelI } from '../interface/joined-channel.interface';
import { MessageI } from '../interface/message.interface';
import { PageI } from '../interface/page.interface';
import { ChannelService } from '../service/channel-service/channel/channel.service';
import { ConnectedUserService } from '../service/connected-user/connected-user.service';
import { JoinedChannelService } from '../service/joined-channel/joined-channel.service';
import { MessageService } from '../service/message/message.service';

@WebSocketGateway({ cors: { origin: ['https://hoppscotch.io', 'http://localhost:3000', 'http://localhost:4200'] } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {

  @WebSocketServer()
  server: Server;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private channelService: ChannelService,
    private connectedUservice: ConnectedUserService,
    private connectedUserService: ConnectedUserService,
    private joinedChannelService: JoinedChannelService,
    private messageService: MessageService) { }


  async onModuleInit() {
    await this.connectedUserService.deleteAll();
    await this.joinedChannelService.deleteAll();
  }

  async handleConnection(socket: Socket) {
    try {
      const decodedToken = await this.authService.verifyJwt(socket.handshake.headers.authorization);
      const user = await this.userService.getOne(decodedToken.user.id);
      if (!user) {
        return this.disconnect(socket);
      } else {
        socket.data.user = user;
        const channels = await this.channelService.getChannelsForUser(user.id, { page: 1, limit: 10 });
        channels.meta.currentPage = channels.meta.currentPage - 1;

        await this.connectedUservice.create({ socketId: socket.id, user });

        return this.server.to(socket.id).emit('channels', channels);

      }
    } catch {
      return this.disconnect(socket);
    }
  }

  async handleDisconnect(socket: Socket) {
    await this.connectedUservice.deleteBySocketId(socket.id);
    socket.disconnect();
  }

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }

  @SubscribeMessage('createChannel')
  async onCreateChannel(socket: Socket, channel: ChannelI) {
    const createdChannel: ChannelI = await this.channelService.createChannel(channel, socket.data.user);

    for (const user of createdChannel.users) {
      const connections: ConnectedUserI[] = await this.connectedUservice.findByUser(user);
      const channels = await this.channelService.getChannelsForUser(user.id, { page: 1, limit: 10 });
      channels.meta.currentPage = channels.meta.currentPage - 1;
      for (const connection of connections) {
        await this.server.to(connection.socketId).emit('channels', channels);
      }
    }
  }

  @SubscribeMessage('paginateChannels')
  async onPaginateChannel(socket: Socket, page: PageI) {
    const channels = await this.channelService.getChannelsForUser(socket.data.user.id, this.handleIncomingPageRequest(page));
    channels.meta.currentPage = channels.meta.currentPage - 1;
    return this.server.to(socket.id).emit('channels', channels);
  }

  @SubscribeMessage('joinChannel')
  async onJoinChannel(socket: Socket, channel: ChannelI) {
    const messages = await this.messageService.findMessagesForChannel(channel, { limit: 10, page: 1 });
    messages.meta.currentPage = messages.meta.currentPage - 1;
    await this.joinedChannelService.create({ socketId: socket.id, user: socket.data.user, channel });
    await this.server.to(socket.id).emit('messages', messages);
  }

  @SubscribeMessage('leaveChannel')
  async onLeaveChannel(socket: Socket) {
    await this.joinedChannelService.deleteBySocketId(socket.id);
  }

  @SubscribeMessage('addMessage')
  async onAddMessage(socket: Socket, message: MessageI) {
    const createdMessage: MessageI = await this.messageService.create({ ...message, user: socket.data.user });
    const channel: ChannelI = await this.channelService.getChannel(createdMessage.channel.id);
    const joinedUsers: JoinedChannelI[] = await this.joinedChannelService.findByChannel(channel);
    for (const user of joinedUsers) {
      await this.server.to(user.socketId).emit('messageAdded', createdMessage);
    }
  }

  private handleIncomingPageRequest(page: PageI) {
    page.limit = page.limit > 100 ? 100 : page.limit;
    page.page = page.page + 1;
    return page;
  }
}

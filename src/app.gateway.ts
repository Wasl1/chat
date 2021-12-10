import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() ws: Server;
  handleConnection(): void {
    console.log('handleConnection invoked');
  }

  afterInit(): void {
    console.log('after init invoked');
  }

  handleDisconnect(): void {
    console.log('handleDisconnect invoked');
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string) {
    console.log(text);
    // client.emit('msgToClient', text);
    this.ws.emit('msgToClient', text);
  }
}

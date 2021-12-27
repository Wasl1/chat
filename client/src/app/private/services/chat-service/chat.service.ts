import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ChannelI, ChannelPaginateI } from 'src/app/model/channel.interface';
import { MessageI, MessagePaginateI } from 'src/app/model/message.interface';
import { CustomSocket } from '../../sockets/custom-socket';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: CustomSocket, private snackbar: MatSnackBar) { }

  getAddedMessage(): Observable<MessageI> {
    return this.socket.fromEvent<MessageI>('messageAdded');
  }

  sendMessage(message: MessageI) {
    this.socket.emit('addMessage', message);
  }

  joinChannel(channel: ChannelI) {
    this.socket.emit('joinChannel', channel);
  }

  leaveChannel(channel: ChannelI) {
    this.socket.emit('leaveChannel', channel);
  }

  getMessages(): Observable<MessagePaginateI> {
    return this.socket.fromEvent<MessagePaginateI>('messages');
  }

  getMyChannels(): Observable<ChannelPaginateI> {
    return this.socket.fromEvent<ChannelPaginateI>('channels');
  }

  emitPaginateChannels(limit: number, page: number) {
    this.socket.emit('paginateChannels', { limit, page })
  }

  createChannel(channel: ChannelI) {
    this.socket.emit('createChannel', channel);
    this.snackbar.open(`Channel ${channel.name} created successfully`, 'Close', {
      duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
    });
  }
}

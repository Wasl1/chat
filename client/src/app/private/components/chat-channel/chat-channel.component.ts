import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { ChannelI } from 'src/app/model/channel.interface';
import { MessagePaginateI } from 'src/app/model/message.interface';
import { ChatService } from '../../services/chat-service/chat.service';
import { map, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-chat-channel',
  templateUrl: './chat-channel.component.html',
  styleUrls: ['./chat-channel.component.scss']
})
export class ChatChannelComponent implements OnChanges, OnDestroy, AfterViewInit {

  @Input() chatChannel: ChannelI;
  @ViewChild('messages') private messagesScroller: ElementRef;

  messagesPaginate$: Observable<MessagePaginateI> = combineLatest([this.chatService.getMessages(), this.chatService.getAddedMessage().pipe(startWith(null))]).pipe(
    map(([messagePaginate, message]) => {
      if (message && message.channel.id === this.chatChannel.id && !messagePaginate.items.some(m => m.id === message.id)) {
        messagePaginate.items.push(message);
      }
      const items = messagePaginate.items.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      messagePaginate.items = items;
      return messagePaginate;
    }),
    tap(() => this.scrollToBottom())
  )

  chatMessage: FormControl = new FormControl(null, [Validators.required]);
  constructor(private chatService: ChatService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.chatService.leaveChannel(changes['chatChannel'].previousValue);
    if (this.chatChannel) {
      this.chatService.joinChannel(this.chatChannel);
    }
  }

  ngAfterViewInit() {
    if (this.messagesScroller) {
      this.scrollToBottom();
    }
  }

  ngOnDestroy() {
    this.chatService.leaveChannel(this.chatChannel);
  }

  sendMessage() {
    this.chatService.sendMessage({ text: this.chatMessage.value, channel: this.chatChannel });
    this.chatMessage.reset();
  }

  scrollToBottom(): void {
    try {
      setTimeout(() => { this.messagesScroller.nativeElement.scrollTop = this.messagesScroller.nativeElement.scrollHeight }, 1);
    } catch { }

  }


}

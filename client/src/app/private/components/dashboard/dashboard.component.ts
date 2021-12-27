import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { ChannelPaginateI } from 'src/app/model/channel.interface';
import { UserI } from 'src/app/model/user.interface';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { ChatService } from '../../services/chat-service/chat.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  channels$: Observable<ChannelPaginateI> = this.chatService.getMyChannels();
  selectedChannel = null;
  user: UserI = this.authService.getLoggedInUser();

  constructor(private chatService: ChatService, private authService: AuthService, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.chatService.emitPaginateChannels(10, 0);
  }

  ngAfterViewInit() {
    this.chatService.emitPaginateChannels(10, 0);
  }

  onSelectChannel(event: MatSelectionListChange) {
    this.selectedChannel = event.source.selectedOptions.selected[0].value;
  }

  onPaginateChannels(pageEvent: PageEvent) {
    this.chatService.emitPaginateChannels(pageEvent.pageSize, pageEvent.pageIndex);
  }

  logout() {
    localStorage.removeItem('nestjs_chat_app');
    this.snackbar.open('Disconnected successfull', 'Close', {
      duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
    });
    this.router.navigate(['../../public/login']);
  }
}

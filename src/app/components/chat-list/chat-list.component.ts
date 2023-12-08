import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from './../../services/chat.service';
import { Chat } from './../../models/chat.model';
import { Router } from '@angular/router';
import { ChatHelper } from 'src/app/helpers/chat.helper';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {
  @Input() chats: Chat[];

  constructor(
    private chatService: ChatService,
    private router: Router,
    private chatHelper: ChatHelper
  ) {}

  selectChat(chat: Chat) {
    this.chatHelper.selectedChat = chat;
    this.router.navigate(['/chats', chat.id]);
  }

  ngOnInit() {
    this.chatService.getAllChats().subscribe((result) => {
      this.chats = result.value.filter((x) => x.topic);
      console.log(result);
    });
  }
}

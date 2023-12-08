import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from './../../services/chat.service';
import { Chat } from './../../models/chat.model';
import { ChatHelper } from 'src/app/helpers/chat.helper';
import { ActivatedRoute } from '@angular/router';
import { ChatMessage } from './../../models/chat-message.model';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teams-chat',
  templateUrl: './teams-chat.component.html',
  styleUrls: ['./teams-chat.component.scss'],
})
export class TeamsChatComponent implements OnInit {
  chatsList: Chat[];
  chatId: string = '';
  chat: Chat = null;

  genericUserId: string = environment.genericUserId;

  messages$: Observable<ChatMessage[]>;

  messageForm = new FormGroup({
    messageBody: new FormControl(''),
  });

  constructor(
    private chatService: ChatService,
    public chatHelper: ChatHelper
  ) {}

  getChatList = () => {
    this.chatService.getAllChats().subscribe((result) => {
      this.chatsList = result.value.filter((x) => x.topic);
    });
  };

  onChatClick = (chatId: string) => {
    this.chatId = chatId;
    this.getChatDetails();
    this.getSelectedChatMessages();
  };

  getChatDetails() {
    this.chatService.getChatDetails(this.chatId).subscribe({
      next: (details) => {
        this.chat = details;
      },
      error: (err) => console.error(err),
    });
  }

  getSelectedChatMessages = () => {
    this.messages$ = this.chatService
      .getChatMessages(this.chatId)
      .pipe(map((result) => result.value.reverse()));
  };

  sendMessage() {
    this.chatService
      .sendChatMessage(this.chatId, this.messageForm.get('messageBody').value)
      .subscribe(() => {
        this.messageForm.patchValue({
          messageBody: '',
        });
        this.getSelectedChatMessages();
      });
  }

  ngOnInit() {
    this.getChatList();
  }
}

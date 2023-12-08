import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from './../../services/chat.service';
import { Chat } from './../../models/chat.model';
import { ChatMessage } from './../../models/chat-message.model';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatHelper } from 'src/app/helpers/chat.helper';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss'],
})
export class ChatDetailComponent implements OnInit, OnDestroy {
  chatId: string = '';
  genericUserId: string = '';
  chat: Chat = null;
  messages$: Observable<ChatMessage[]>;

  messageForm = new FormGroup({
    messageBody: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private chatHelper: ChatHelper
  ) {}

  ngOnInit(): void {
    this.chatId = this.route.snapshot.paramMap.get('id');
    this.genericUserId = environment.genericUserId;
    this.getChatDetails();
    this.loadMessages();
  }

  getChatDetails() {
    this.chat = this.chatHelper.selectedChat;
    if (this.chat == null) {
      this.chatService.getChatDetails(this.chatId).subscribe({
        next: (details) => {
          this.chat = details;
        },
        error: (err) => console.error(err),
      });
    }
  }

  loadMessages() {
    this.messages$ = this.chatService
      .getChatMessages(this.chatId)
      .pipe(map((result) => result.value));
  }

  sendMessage() {
    this.chatService
      .sendChatMessage(this.chatId, this.messageForm.get('messageBody').value)
      .subscribe(() => {
        this.messageForm.patchValue({
          messageBody: '',
        });
        this.loadMessages();
      });
  }

  ngOnDestroy(): void {
    this.chatHelper.selectedChat = null;
  }
}

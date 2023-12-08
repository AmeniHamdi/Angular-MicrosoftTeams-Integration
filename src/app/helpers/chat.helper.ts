import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chat } from '../models/chat.model';

@Injectable({
  providedIn: 'root',
})
export class ChatHelper {
  selectedChatSubject = new BehaviorSubject<Chat>(null);

  constructor() {}

  get selectedChat(): Chat {
    return this.selectedChatSubject.getValue();
  }

  set selectedChat(chat: Chat) {
    this.selectedChatSubject.next(chat);
  }
}

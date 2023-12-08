import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ChatResponse, Chat } from '../models/chat.model';
import { ChatMessageResponse } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private graphEndpoint = 'https://graph.microsoft.com/v1.0';
  private _token: string = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllChats(): Observable<ChatResponse> {
    const url = `${this.graphEndpoint}/me/chats?$top=50&$filter=chatType eq 'group'`;
    return this.http.get<ChatResponse>(url, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authService.getAccessToken()}`,
      }),
    });
  }

  getChatMessages(chatId: string): Observable<ChatMessageResponse> {
    const url = `${this.graphEndpoint}/chats/${chatId}/messages`; 
    return this.http.get<ChatMessageResponse>(url, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authService.getAccessToken()}`,
      }),
    });
  }

  sendChatMessage(chatId: string, message: string): Observable<any> {
    const url = `${this.graphEndpoint}/chats/${chatId}/messages`;
    console.log({ message });
    const payload = {
      body: {
        content: message,
      },
    };
    return this.http.post(url, payload, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authService.getAccessToken()}`,
        'Content-Type': 'application/json',
      }),
    });
  }

  getChatParticipants(chatId: string): Observable<any> {
    const url = `${this.graphEndpoint}/chats/${chatId}/members`;
    return this.http.get(url, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authService.getAccessToken()}`,
      }),
    });
  }

  getChatDetails(chatId: string): Observable<Chat> {
    const url = `${this.graphEndpoint}/chats/${chatId}`;
    return this.http.get<Chat>(url, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authService.getAccessToken()}`,
      }),
    });
  }

  get token(): string {
    return this._token;
  }

  setToken(token: string): void {
    this._token = token;
  }
}

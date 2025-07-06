import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import PaginatedResponse from '../models/PaginatedResponse';
import ChatMessage from '../models/ChatMessage';
import { apiConf, getApiUrl } from '../config/apiConfig';
import ApiResponse from '../models/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class ChatServiceService {
  private socket: WebSocket | null = null;
  private newMessageSignal = signal<ChatMessage | null>(null);
  constructor(private http: HttpClient) {}

  getNewMessageSignal() {
    return this.newMessageSignal;
  }

  private handleIncomingMessage(data: any) {
    const message: ChatMessage = data; // asegúrate que tenga el mismo formato
    this.newMessageSignal.set(message);
  }

  connectWebSocket() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) return;

    const url = apiConf.apiUrl.slice(4, -4);
    const urlWebSocket = 'ws' + url + 'ws/chat';

    this.socket = new WebSocket(urlWebSocket);

    this.socket.onopen = () => {
      console.log('[WebSocket] Connected');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('[WebSocket] Message received: ', data);
      this.handleIncomingMessage(data);
    };

    this.socket.onclose = () => {
      console.log('[WebSocket] Closed');
      this.socket = null;
    };

    this.socket.onerror = (error) => {
      console.error('[WebSocket] Error:', error);
    };
  }

  sendMessage(message: { receiverUsername: string; content: string }) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.warn('[WebSocket] Not connected yet');
      this.connectWebSocket(); // opcional: reconectar
      return;
    }
    this.socket.send(JSON.stringify(message));
  }

  getMessages(
    usernameToChat: string,
    offset: number,
    limit: number
  ): Observable<ApiResponse<PaginatedResponse<ChatMessage>>> {
    return this.http.get<ApiResponse<PaginatedResponse<ChatMessage>>>(
      getApiUrl(
        apiConf.endpoints.chats.getChatMessages(usernameToChat, offset, limit)
      ),
      { withCredentials: true }
    );
  }
}

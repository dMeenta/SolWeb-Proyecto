import { Component, effect, HostListener, Input, signal } from '@angular/core';
import { Friend } from '../friend-list-object/friend-list-object.component';
import { NgIf } from '@angular/common';
import { activeChatSignal } from '../../shared/ui/signals/openChat.signal';
import {
  trigger,
  transition,
  style,
  animate,
  state,
  sequence,
} from '@angular/animations';
import { MessagesContainerComponent } from '../messages-container/messages-container.component';
import { ChatServiceService } from '../../services/chat-service.service';
import ChatMessage from '../../models/ChatMessage';
import { newSentMessageSignal } from '../../shared/ui/signals/sentNewMessage.signal';

@Component({
  selector: 'app-bubble-chat',
  imports: [NgIf, MessagesContainerComponent],
  templateUrl: './bubble-chat.component.html',
  styleUrl: './bubble-chat.component.css',
  animations: [
    trigger('twoStepExpand', [
      state(
        'void',
        style({
          width: '0',
          height: '0',
          opacity: 0,
        })
      ),
      transition('void => *', [
        sequence([
          // Fase 1: Expansión horizontal (barra)
          animate(
            '200ms ease-out',
            style({
              width: '20rem',
              height: '0.5rem', // Altura mínima para la barra
              opacity: 0.8,
            })
          ),
          // Fase 2: Expansión vertical (chat completo)
          animate(
            '300ms ease-out',
            style({
              height: '27.5rem',
              opacity: 1,
            })
          ),
        ]),
      ]),
      transition('* => void', [
        sequence([
          // Fase 1: Contracción vertical
          animate(
            '150ms ease-in',
            style({
              height: '0.5rem',
              opacity: 0.8,
            })
          ),
          // Fase 2: Contracción horizontal
          animate(
            '150ms ease-in',
            style({
              width: '0',
              opacity: 0,
            })
          ),
        ]),
      ]),
    ]),
  ],
})
export class BubbleChatComponent {
  showingChat = true;
  @Input() friend!: Friend;
  messageContent = signal('');

  constructor(private chatService: ChatServiceService) {
    effect(() => {
      const activeChatUsername = activeChatSignal();
      this.showingChat = activeChatUsername === this.friend.friendUsername;
    });
    chatService.connectWebSocket();
  }

  toggleChat() {
    if (this.showingChat) {
      activeChatSignal.set(null);
    } else {
      activeChatSignal.set(this.friend.friendUsername);
    }
  }

  closeChat() {
    activeChatSignal.set(null);
    newSentMessageSignal.set(null);
  }

  submit(event?: Event) {
    event?.preventDefault();

    const messageContent = this.messageContent().trim();
    if (!messageContent) return;

    const message = {
      receiverUsername: this.friend.friendUsername,
      content: messageContent,
    };

    this.chatService.sendMessage(message);

    const localMsg: ChatMessage = {
      id: 'local-' + Date.now(), // id temporal, único para frontend
      sender: 'localusername', // debe ser tu username real, ej. inyectado o almacenado
      receiver: this.friend.friendUsername,
      content: messageContent,
      timestamp: Date.now() / 1000,
      chatId: '',
    };

    newSentMessageSignal.set(localMsg);

    this.messageContent.set('');
  }

  clearMessageBar() {
    this.messageContent.set('');
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    this.closeChat();
  }
}

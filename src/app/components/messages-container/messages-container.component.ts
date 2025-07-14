import {
  Component,
  computed,
  effect,
  Input,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { Friend } from '../friend-list-object/friend-list-object.component';
import { NgForOf, NgIf } from '@angular/common';
import ChatMessage from '../../models/ChatMessage';
import { ChatServiceService } from '../../services/chat-service.service';
import { MessageReceivedComponent } from '../message-received/message-received.component';
import { MessageSentComponent } from '../message-sent/message-sent.component';
import { newSentMessageSignal } from '../../shared/ui/signals/sentNewMessage.signal';
import { toast } from 'ngx-sonner';
import { LoaderSpinnerComponent } from '../loader-spinner/loader-spinner.component';

@Component({
  selector: 'app-messages-container',
  imports: [
    NgIf,
    NgForOf,
    MessageReceivedComponent,
    MessageSentComponent,
    LoaderSpinnerComponent,
  ],
  templateUrl: './messages-container.component.html',
  styleUrl: './messages-container.component.css',
})
export class MessagesContainerComponent implements OnInit {
  @Input() friend!: Friend;
  private allChatMessages = signal<ChatMessage[]>([]);
  private offset = signal(0);
  private limit = 20;
  private loading = signal(false);
  private noMore = signal(false);

  readonly chatMessages: Signal<ChatMessage[]> = computed(() =>
    this.allChatMessages()
  );

  readonly isLoading: Signal<boolean> = computed(() => this.loading());

  constructor(private chatService: ChatServiceService) {
    effect(() => {
      const newMsg = this.chatService.getNewMessageSignal()();
      if (
        newMsg?.sender === this.friend.friendUsername ||
        newMsg?.receiver === this.friend.friendUsername
      ) {
        this.allChatMessages.update((prev) => [newMsg, ...prev]);
      }
    });
    effect(() => {
      // Escuchar mensajes locales enviados por mí mismo
      const sentMsg = newSentMessageSignal();
      if (sentMsg) {
        this.allChatMessages.update((prev) => [sentMsg, ...prev]);
        newSentMessageSignal.set(null);
      }
    });
  }
  ngOnInit(): void {
    this.getMessagesWithUser();
  }

  getMessagesWithUser() {
    if (this.loading() || this.noMore()) return;

    this.loading.set(true);

    this.chatService
      .getMessages(this.friend.friendUsername, this.offset(), this.limit)
      .subscribe((res) => {
        if (!res.success) {
          toast.error(res.message);
          this.loading.set(false);
          return;
        }
        const page = res.data;
        const current = this.allChatMessages();
        this.allChatMessages.set([...current, ...page.content]);

        this.offset.set(this.offset() + this.limit);

        if (page.content.length < this.limit) {
          this.noMore.set(true);
        }

        this.loading.set(false);
      });
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    var positiveScrollTop = target.scrollTop * -1;

    const topReached =
      positiveScrollTop + target.clientHeight >= target.scrollHeight;

    if (topReached) {
      this.getMessagesWithUser(); // O la función que necesites para cargar más datos
    }
  }

  trackByMsgId(i: number, msg: ChatMessage) {
    return msg.id;
  }
}

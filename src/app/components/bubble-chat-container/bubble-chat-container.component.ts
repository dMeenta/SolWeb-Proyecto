import { Component, computed, effect, signal, Signal } from '@angular/core';
import { Friend } from '../friend-list-object/friend-list-object.component';
import { BubbleChatComponent } from '../bubble-chat/bubble-chat.component';
import { openChatSignal } from '../../shared/ui/signals/openChat.signal';
import { NgForOf } from '@angular/common';
import {
  trigger,
  transition,
  animate,
  keyframes,
  style,
} from '@angular/animations';

@Component({
  selector: 'app-bubble-chat-container',
  imports: [BubbleChatComponent, NgForOf],
  templateUrl: './bubble-chat-container.component.html',
  styleUrl: './bubble-chat-container.component.css',
  animations: [
    trigger('bubblePop', [
      transition(':enter', [
        animate(
          '250ms ease-out',
          keyframes([
            style({ transform: 'scale(0)', offset: 0 }),
            style({ transform: 'scale(1.1)', offset: 0.6 }),
            style({ transform: 'scale(1)', offset: 1 }),
          ])
        ),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'scale(0)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class BubbleChatContainerComponent {
  private allOpenedChats = signal<Friend[]>([]);
  readonly openedChats: Signal<Friend[]> = computed(() =>
    this.allOpenedChats()
  );

  constructor() {
    effect(() => {
      const queue = openChatSignal();
      const trimmed = queue.slice(-3);

      this.allOpenedChats.set(trimmed);
    });
  }

  trackByUsername(index: number, friend: Friend): string {
    return friend.friendUsername;
  }
}

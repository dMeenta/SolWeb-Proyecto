import { Component, Input } from '@angular/core';
import ChatMessage from '../../models/ChatMessage';
import { NgIf } from '@angular/common';
import { getTimeOnly } from '../../shared/ui/functions/formatDate';

@Component({
  selector: 'app-message-sent',
  imports: [NgIf],
  templateUrl: './message-sent.component.html',
  styleUrl: './message-sent.component.css',
})
export class MessageSentComponent {
  isShowingTime = false;
  @Input() msg!: ChatMessage;

  get formattedTimestamp(): string {
    return getTimeOnly(this.msg.timestamp);
  }

  showTime() {
    this.isShowingTime = !this.isShowingTime;
  }
}

import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import ChatMessage from '../../models/ChatMessage';
import { getTimeOnly } from '../../shared/ui/functions/formatDate';

@Component({
  selector: 'app-message-received',
  imports: [NgIf],
  templateUrl: './message-received.component.html',
  styleUrl: './message-received.component.css',
})
export class MessageReceivedComponent {
  isShowingTime = false;
  @Input() friendProfilePicture!: string;
  @Input() msg!: ChatMessage;

  get formattedTimestamp(): string {
    return getTimeOnly(this.msg.timestamp);
  }

  showTime() {
    this.isShowingTime = !this.isShowingTime;
  }
}

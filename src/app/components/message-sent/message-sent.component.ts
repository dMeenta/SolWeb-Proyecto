import { Component, Input } from '@angular/core';
import ChatMessage from '../../models/ChatMessage';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-message-sent',
  imports: [DatePipe, NgIf],
  templateUrl: './message-sent.component.html',
  styleUrl: './message-sent.component.css',
})
export class MessageSentComponent {
  isShowingTime = false;
  @Input() msg!: ChatMessage;

  get formattedTimestamp(): Date {
    // Convierte de segundos a milisegundos si es necesario
    const timestamp =
      typeof this.msg.timestamp === 'number'
        ? this.msg.timestamp * 1000
        : Number(this.msg.timestamp) * 1000;

    return new Date(timestamp);
  }

  showTime() {
    this.isShowingTime = !this.isShowingTime;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';
import ChatMessage from '../../models/ChatMessage';

@Component({
  selector: 'app-message-received',
  imports: [DatePipe, NgIf],
  templateUrl: './message-received.component.html',
  styleUrl: './message-received.component.css',
})
export class MessageReceivedComponent {
  isShowingTime = false;
  @Input() friendProfilePicture!: string;
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

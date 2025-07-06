import { signal } from '@angular/core';
import ChatMessage from '../../../models/ChatMessage';

export const newSentMessageSignal = signal<ChatMessage | null>(null);

import { signal } from '@angular/core';
import { Friend } from '../../../components/friend-list-object/friend-list-object.component';

export const openChatSignal = signal<Friend[]>([]);
export const activeChatSignal = signal<string | null>(null);

import { signal } from '@angular/core';
import { Friend } from '../../../components/friend-list-object/friend-list-object.component';

export const usernameRequestOnActionSignal = signal<string | null>(null);
export const newFriendInfoSignal = signal<Friend[]>([]);

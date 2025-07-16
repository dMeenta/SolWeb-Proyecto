import { Signal, signal, WritableSignal } from '@angular/core';

export type ModalContent =
  | { type: 'likes'; postId: string }
  | {
      type: 'edit';
      postInfo: {
        postId: string;
        content: string;
        contentSignal: WritableSignal<string>;
      };
    }
  | null;

export const modalContentSignal = signal<ModalContent>(null);

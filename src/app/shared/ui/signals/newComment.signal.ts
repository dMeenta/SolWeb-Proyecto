import { signal } from '@angular/core';
import { CommentaryDTO } from '../../../services/comments.service';

export const newCommentSignal = signal<CommentaryDTO | null>(null);

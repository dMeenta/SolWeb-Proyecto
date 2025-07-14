import {
  Component,
  computed,
  effect,
  Input,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { CommentaryComponent } from '../commentary/commentary.component';
import {
  CommentaryDTO,
  CommentsService,
} from '../../services/comments.service';
import { NgForOf, NgIf } from '@angular/common';
import { newCommentSignal } from '../../shared/ui/signals/newComment.signal';

@Component({
  selector: 'app-commentary-container',
  imports: [CommentaryComponent, NgForOf, NgIf],
  templateUrl: './commentary-container.component.html',
  styleUrl: './commentary-container.component.css',
})
export class CommentaryContainerComponent implements OnInit {
  @Input({ required: true }) postId!: string;
  private allComments = signal<CommentaryDTO[]>([]);
  private offset = signal(0);
  private limit = 5;
  private loading = signal(false);
  private noMore = signal(false);

  readonly comments: Signal<CommentaryDTO[]> = computed(() =>
    this.allComments()
  );
  readonly isLoading: Signal<boolean> = computed(() => this.loading());

  constructor(private commentService: CommentsService) {
    effect(() => {
      const newComment = newCommentSignal();
      if (newComment) {
        if (newComment.postId === this.postId) {
          this.allComments.set([newComment, ...this.allComments()]);
          newCommentSignal.set(null);
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadPostComments();
  }

  loadPostComments() {
    if (this.loading() || this.noMore()) return;

    this.loading.set(true);

    this.commentService
      .findByPostId(this.postId, this.offset(), this.limit)
      .subscribe((res) => {
        if (!res.success) {
          this.loading.set(false);
          return;
        }

        const page = res.data;
        const current = this.allComments();
        this.allComments.set([...current, ...page.content]);

        this.offset.set(this.offset() + this.limit);

        if (page.content.length < this.limit) {
          this.noMore.set(true);
        }
        this.loading.set(false);
      });
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;

    const bottomReached =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 10;

    if (bottomReached) {
      this.loadPostComments();
    }
  }
}

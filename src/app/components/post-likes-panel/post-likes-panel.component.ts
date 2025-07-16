import { Component, computed, OnInit, Signal, signal } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { showLikesListSignal } from '../../shared/ui/signals/showLikesList.signal';
import { toast } from 'ngx-sonner';
import { NgForOf, NgIf } from '@angular/common';
import { LoaderSpinnerComponent } from '../loader-spinner/loader-spinner.component';

@Component({
  selector: 'app-post-likes-panel',
  imports: [NgForOf, NgIf, LoaderSpinnerComponent],
  templateUrl: './post-likes-panel.component.html',
  styleUrl: './post-likes-panel.component.css',
})
export class PostLikesPanelComponent implements OnInit {
  private allLikers = signal<string[]>([]);
  private offset = signal(0);
  private limit = 10;
  private loading = signal(false);
  private noMore = signal(false);

  readonly likers: Signal<string[]> = computed(() => this.allLikers());
  readonly isLoading: Signal<boolean> = computed(() => this.loading());

  constructor(private readonly postService: PostsService) {}

  ngOnInit(): void {
    this.getLikersByPostId();
  }

  getLikersByPostId() {
    if (this.loading() || this.noMore()) return;

    this.loading.set(true);

    const postId = showLikesListSignal();
    if (postId) {
      this.postService
        .getLikersListByPostId(postId, this.offset(), this.limit)
        .subscribe({
          next: (res) => {
            const page = res.data;
            const current = this.allLikers();
            this.allLikers.set([...current, ...page.content]);

            this.offset.set(this.offset() + this.limit);

            if (page.content.length < this.limit) {
              this.noMore.set(true);
            }

            this.loading.set(false);
          },
          error: (err) => {
            toast.error(err.error.message);
            this.loading.set(false);
            return;
          },
        });
    }
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;

    const bottomReached =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 10;

    if (bottomReached) {
      this.getLikersByPostId();
    }
  }

  close() {
    showLikesListSignal.set(null);
  }
}

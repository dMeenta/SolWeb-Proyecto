import {
  Component,
  computed,
  ElementRef,
  OnDestroy,
  OnInit,
  signal,
  Signal,
  ViewChild,
} from '@angular/core';
import { PostComponent } from '../../../../components/post/post.component';
import { LoaderSpinnerComponent } from '../../../../components/loader-spinner/loader-spinner.component';
import { NgForOf, NgIf } from '@angular/common';
import { PostDTO } from '../../../community-page/community-page.component';
import { PostsService } from '../../../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-feed',
  imports: [PostComponent, LoaderSpinnerComponent, NgIf, NgForOf],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent implements OnInit, OnDestroy {
  private username!: string;
  private allUserPosts = signal<PostDTO[]>([]);
  private offset = signal(0);
  private limit = 5;
  private loading = signal(false);
  private noMore = signal(false);

  readonly userPosts: Signal<PostDTO[]> = computed(() => this.allUserPosts());
  readonly isLoading: Signal<boolean> = computed(() => this.loading());

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLElement>;

  onResize = () => {
    this.checkIfNeedMore();
  };

  constructor(
    private readonly postService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.username = params['username'];
      this.getUserPosts();
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.checkIfNeedMore();
    }, 0);
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
  }

  getUserPosts() {
    if (this.loading() || this.noMore()) return;
    this.loading.set(true);

    this.postService
      .getUserPosts(this.username, this.offset(), this.limit)
      .subscribe({
        next: (res) => {
          const page = res.data;
          const current = this.allUserPosts();
          this.allUserPosts.set([...current, ...page.content]);
          this.offset.set(this.offset() + this.limit);
          if (page.content.length < this.limit) {
            this.noMore.set(true);
          }

          this.loading.set(false);
          this.checkIfNeedMore();
        },
        error: (err) => {
          toast.error(err.error.message);
          this.loading.set(false);
        },
      });
  }

  checkIfNeedMore() {
    setTimeout(() => {
      const el = this.scrollContainer?.nativeElement;
      if (!el || this.noMore()) return;
      const hasScroll = el.scrollHeight > el.clientHeight;
      if (!hasScroll) {
        this.getUserPosts();
      }
    }, 50);
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    const bottomReached =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 50;
    if (bottomReached) {
      this.getUserPosts();
    }
  }
}

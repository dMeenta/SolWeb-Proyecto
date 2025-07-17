import {
  AfterViewInit,
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
import {
  debounceTime,
  filter,
  fromEvent,
  of,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-feed',
  imports: [PostComponent, LoaderSpinnerComponent, NgIf, NgForOf],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLElement>;
  private destroy$ = new Subject<void>();
  private username!: string;
  private offset = 0;
  private limit = 5;

  private allUserPosts = signal<PostDTO[]>([]);
  private loading = signal(false);
  private noMore = signal(false);

  readonly userPosts: Signal<PostDTO[]> = computed(() => this.allUserPosts());
  readonly isLoading: Signal<boolean> = computed(() => this.loading());

  constructor(
    private readonly postService: PostsService,
    private route: ActivatedRoute
  ) {}

  onResize = () => {
    this.checkIfNeedMore();
  };

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params) => {
          this.username = params['username'];
          this.offset = 0;
          this.noMore.set(false);
          this.allUserPosts.set([]);
          return this.loadMorePosts();
        })
      )
      .subscribe();
  }
  ngAfterViewInit(): void {
    fromEvent(this.scrollContainer.nativeElement, 'scroll')
      .pipe(
        debounceTime(100),
        takeUntil(this.destroy$),
        filter(() => !this.loading() && !this.noMore()),
        filter(() => {
          const el = this.scrollContainer.nativeElement;
          return el.scrollTop + el.clientHeight >= el.scrollHeight - 50;
        }),
        switchMap(() => this.loadMorePosts())
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadMorePosts() {
    this.loading.set(true);
    return this.postService
      .getUserPosts(this.username, this.offset, this.limit)
      .pipe(
        takeUntil(this.destroy$),
        switchMap((res) => {
          const page = res.data;
          const current = this.allUserPosts();
          this.allUserPosts.set([...current, ...page.content]);
          this.offset += this.limit;
          if (page.content.length < this.limit) {
            this.noMore.set(true);
          }
          this.loading.set(false);
          return of(null);
        })
      );
  }

  checkIfNeedMore() {
    setTimeout(() => {
      const el = this.scrollContainer?.nativeElement;
      if (!el || this.noMore()) return;
      const hasScroll = el.scrollHeight > el.clientHeight;
      if (!hasScroll || this.loading()) return;
      if (!hasScroll) {
        this.loadMorePosts().subscribe();
      }
    }, 50);
  }

  removePost(postId: string) {
    this.allUserPosts.update((posts) => posts.filter((p) => p.id !== postId));
  }
}

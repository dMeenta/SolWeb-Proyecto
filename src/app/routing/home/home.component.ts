import { Component, computed, OnInit, signal, Signal } from '@angular/core';
import { PostDTO } from '../community-page/community-page.component';
import { CommonModule, NgForOf } from '@angular/common';
import { UserCommunitiesBubblesComponent } from '../../components/user-communities-bubbles/user-communities-bubbles.component';
import { toast } from 'ngx-sonner';
import { PostsService } from '../../services/posts.service';
import { PostComponent } from '../../components/post/post.component';
import { ScrollEventService } from '../../services/scroll-event.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    PostComponent,
    CommonModule,
    UserCommunitiesBubblesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private allPosts = signal<PostDTO[]>([]);
  private offset = signal(0);
  private limit = 5;
  private loading = signal(false);
  private noMore = signal(false);

  readonly posts: Signal<PostDTO[]> = computed(() => this.allPosts());
  readonly isLoading: Signal<boolean> = computed(() => this.loading());

  constructor(
    private postsService: PostsService,
    private scrollEventService: ScrollEventService
  ) {}

  ngOnInit(): void {
    this.loadPostsOfUserFeed();
    this.scrollEventService.scroll$.subscribe(() => {
      this.loadPostsOfUserFeed();
    });
  }

  loadPostsOfUserFeed() {
    if (this.loading() || this.noMore()) return;

    this.loading.set(true);

    this.postsService
      .getUserFeed(this.offset(), this.limit)
      .subscribe((res) => {
        if (!res.success) {
          toast.error(res.message);
          this.loading.set(false);
          toast.error(res.message);
          return;
        }

        const page = res.data;
        const current = this.allPosts();
        this.allPosts.set([...current, ...page.content]);

        this.offset.set(this.offset() + this.limit);

        if (page.content.length < this.limit) {
          this.noMore.set(true);
        }
        this.loading.set(false);
      });
  }
}

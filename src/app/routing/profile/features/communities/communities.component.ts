import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  OnDestroy,
  OnInit,
  Signal,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { CommunityService } from '../../../../services/community.service';
import { toast } from 'ngx-sonner';
import { UserCommunityDTO } from '../../../../components/user-communities-bubbles/user-communities-bubbles.component';
import { LoaderSpinnerComponent } from '../../../../components/loader-spinner/loader-spinner.component';
import { CommunityCardComponent } from '../../../../components/community-card/community-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-communities',
  imports: [
    NgForOf,
    CommonModule,
    LoaderSpinnerComponent,
    CommunityCardComponent,
  ],
  templateUrl: './communities.component.html',
  styleUrl: './communities.component.css',
})
export class CommunitiesComponent implements OnInit, AfterViewInit, OnDestroy {
  private username!: string;
  private allCommunities = signal<UserCommunityDTO[]>([]);
  private offset = signal(0);
  private limit = 10;
  private loading = signal(false);
  private noMore = signal(false);

  readonly communities: Signal<UserCommunityDTO[]> = computed(() =>
    this.allCommunities()
  );
  readonly isLoading: Signal<boolean> = computed(() => this.loading());

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLElement>;

  onResize = () => {
    this.checkIfNeedMore();
  };

  constructor(
    private readonly communityService: CommunityService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe((params) => {
      this.username = params['username'];
      console.log(this.username);
      this.getUserCommunities();
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

  getUserCommunities() {
    if (this.loading() || this.noMore()) return;
    this.loading.set(true);

    this.communityService
      .getCommunitiesByUser(this.username, this.offset(), this.limit)
      .subscribe({
        next: (res) => {
          const page = res.data;
          const current = this.allCommunities();
          this.allCommunities.set([...current, ...page.content]);
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
        this.getUserCommunities();
      }
    }, 50);
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    const bottomReached =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 50;
    if (bottomReached) {
      this.getUserCommunities();
    }
  }
}

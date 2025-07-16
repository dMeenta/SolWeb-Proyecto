import {
  Component,
  computed,
  ElementRef,
  OnInit,
  Signal,
  signal,
  ViewChild,
} from '@angular/core';
import { CommunityService } from '../../services/community.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';

export interface UserCommunityDTO {
  name: string;
  memberSince: number;
  card: string;
}

@Component({
  selector: 'app-user-communities-bubbles',
  imports: [NgFor, NgIf],
  templateUrl: './user-communities-bubbles.component.html',
  styleUrl: './user-communities-bubbles.component.css',
})
export class UserCommunitiesBubblesComponent implements OnInit {
  private allCommunities = signal<UserCommunityDTO[]>([]);
  private offset = signal(0);
  private limit = 10;
  private loading = signal(false);
  private noMore = signal(false);
  canScrollLeft = signal(false);
  canScrollRight = signal(true);

  readonly communities: Signal<UserCommunityDTO[]> = computed(() =>
    this.allCommunities()
  );
  readonly isLoading: Signal<boolean> = computed(() => this.loading());

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLElement>;

  constructor(
    private communityService: CommunityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserCommunities();
  }

  handleScroll(event: Event) {
    const target = event.target as HTMLElement;
    const nearEnd =
      target.scrollLeft + target.clientWidth >= target.scrollWidth - 50;

    if (nearEnd) {
      this.getUserCommunities();
    }

    if (target.scrollLeft === 0) {
      this.canScrollLeft.set(false);
    } else {
      this.canScrollLeft.set(true);
    }

    if (target.scrollLeft + target.clientWidth >= target.scrollWidth) {
      this.canScrollRight.set(false);
    } else {
      this.canScrollRight.set(true);
    }
  }

  scrollLeft() {
    const el = this.scrollContainer.nativeElement;
    el.scrollBy({ left: -400, behavior: 'smooth' });
    setTimeout(
      () => this.handleScroll({ target: el } as unknown as Event),
      300
    );
  }

  scrollRight() {
    const el = this.scrollContainer.nativeElement;
    el.scrollBy({ left: 400, behavior: 'smooth' });
    setTimeout(
      () => this.handleScroll({ target: el } as unknown as Event),
      300
    );
  }

  getUserCommunities() {
    if (this.loading() || this.noMore()) return;
    this.loading.set(true);

    this.communityService
      .getCurrentUserCommunities(this.offset(), this.limit)
      .subscribe((res) => {
        if (!res.success) {
          toast.error(res.message);
        }
        const page = res.data;
        const current = this.allCommunities();
        this.allCommunities.set([...current, ...page.content]);
        this.offset.set(this.offset() + this.limit);
        if (page.content.length < this.limit) {
          this.noMore.set(true);
        }
        this.loading.set(false);
      });
  }

  goToCommunityPage(gameName: String) {
    this.router.navigateByUrl(`community/${gameName}`);
  }
}

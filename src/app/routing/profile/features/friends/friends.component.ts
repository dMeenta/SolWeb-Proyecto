import { NgForOf, NgIf } from '@angular/common';
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
import {
  UserMinimal,
  UsersService,
} from '../../../../auth/data-access/users.service';
import { toast } from 'ngx-sonner';
import { ActivatedRoute } from '@angular/router';
import { UserButtonComponent } from '../../../../components/user-button/user-button.component';
import { LoaderSpinnerComponent } from '../../../../components/loader-spinner/loader-spinner.component';

@Component({
  selector: 'app-friends',
  imports: [NgIf, UserButtonComponent, LoaderSpinnerComponent, NgForOf],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css',
})
export class FriendsComponent implements OnInit, OnDestroy, AfterViewInit {
  private username!: string;
  private allUserFriends = signal<UserMinimal[]>([]);
  private offset = signal(0);
  private limit = 10;
  private loading = signal(false);
  private noMore = signal(false);

  readonly userFriends: Signal<UserMinimal[]> = computed(() =>
    this.allUserFriends()
  );
  readonly isLoading: Signal<boolean> = computed(() => this.loading());

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLElement>;

  onResize = () => {
    this.checkIfNeedMore();
  };

  constructor(
    private readonly userService: UsersService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe((params) => {
      this.username = params['username'];
      this.getFriends();
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

  getFriends() {
    if (this.loading() || this.noMore()) return;

    this.loading.set(true);

    this.userService
      .getFriendsListByUser(this.username, this.offset(), this.limit)
      .subscribe((res) => {
        console.log(res);
        if (!res.success) {
          toast.error(res.message);
          this.loading.set(false);
          return;
        }

        const page = res.data;
        const current = this.allUserFriends();
        this.allUserFriends.set([...current, ...page.content]);

        this.offset.set(this.offset() + this.limit);

        if (page.content.length < this.limit) {
          this.noMore.set(true);
        }

        this.loading.set(false);
      });
  }

  checkIfNeedMore() {
    setTimeout(() => {
      const el = this.scrollContainer?.nativeElement;
      if (!el || this.noMore()) return;
      const hasScroll = el.scrollHeight > el.clientHeight;
      if (!hasScroll) {
        this.getFriends();
      }
    }, 50);
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    const bottomReached =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 50;
    if (bottomReached) {
      this.getFriends();
    }
  }
}

import {
  Component,
  computed,
  effect,
  Input,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { UserButtonComponent } from '../user-button/user-button.component';
import {
  UserMinimal,
  UsersService,
} from '../../auth/data-access/users.service';
import { NgForOf, NgIf } from '@angular/common';
import { usernameRequestOnActionSignal } from '../../shared/ui/signals/friendRequestChange.signal';
import { animate, style, transition, trigger } from '@angular/animations';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-friendship-requests-list',
  imports: [UserButtonComponent, NgIf, NgForOf],
  templateUrl: './friendship-requests-list.component.html',
  styleUrl: './friendship-requests-list.component.css',
  animations: [
    trigger('fadeOutSlideUp', [
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate(
          '200ms ease-in',
          style({ opacity: 0, transform: 'translateY(-10px)' })
        ),
      ]),
    ]),
  ],
})
export class FriendshipRequestsListComponent implements OnInit {
  @Input() set switcher(value: boolean) {
    if (value) {
      // Reset si deseas volver a cargar desde 0
      this.offset.set(0);
      this.noMore.set(false);
      this.allRequests.set([]);
      this.getFriendshipRequests();
    }
  }
  private allRequests = signal<UserMinimal[]>([]);
  private offset = signal(0);
  private limit = 5;
  private loading = signal(false);
  private noMore = signal(false);

  readonly requests: Signal<UserMinimal[]> = computed(() => this.allRequests());

  constructor(private userService: UsersService) {
    // 🔁 Escucha las eliminaciones desde otro componente
    effect(() => {
      const usernameToRemove = usernameRequestOnActionSignal();
      if (usernameToRemove != null) {
        this.allRequests.set(
          this.allRequests().filter((u) => u.username !== usernameToRemove)
        );
        usernameRequestOnActionSignal.set(null); // Reset
      }
    });
  }

  ngOnInit(): void {
    if (this.switcher) this.getFriendshipRequests();
  }

  getFriendshipRequests() {
    if (this.loading() || this.noMore()) return;

    this.loading.set(true);

    this.userService
      .getFriendshipRequests(this.offset(), this.limit)
      .subscribe((res) => {
        if (!res.success) {
          toast.error(res.message);
          this.loading.set(false);
          return;
        }

        const page = res.data;
        const current = this.allRequests();
        this.allRequests.set([...current, ...page.content]);

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
      this.getFriendshipRequests();
    }
  }

  trackByUsername(index: number, user: UserMinimal): string {
    return user.username;
  }
}

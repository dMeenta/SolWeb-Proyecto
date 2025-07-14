import {
  Component,
  Signal,
  signal,
  computed,
  effect,
  OnInit,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  Friend,
  FriendListObjectComponent,
} from '../../../friend-list-object/friend-list-object.component';
import { UsersService } from '../../../../auth/data-access/users.service';
import { newFriendInfoSignal } from '../../../../shared/ui/signals/friendRequestChange.signal';
import { trigger, transition, style, animate } from '@angular/animations';
import { toast } from 'ngx-sonner';
import { LoaderSpinnerComponent } from '../../../loader-spinner/loader-spinner.component';

@Component({
  selector: 'app-friends-list',
  imports: [NgIf, FriendListObjectComponent, NgFor, LoaderSpinnerComponent],
  templateUrl: './friends-list.component.html',
  styleUrl: './friends-list.component.css',
  animations: [
    trigger('fadeInSlideRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100px)' }),
        animate(
          '400ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),
  ],
})
export class FriendsListComponent implements OnInit {
  private allFriends = signal<Friend[]>([]);
  private offset = signal(0);
  private limit = 8;
  private loading = signal(false);
  private noMore = signal(false);

  readonly friends: Signal<Friend[]> = computed(() => this.allFriends());
  readonly isLoading: Signal<boolean> = computed(() => this.loading());

  constructor(private userService: UsersService) {
    effect(() => {
      const queue = newFriendInfoSignal();
      if (queue.length > 0) {
        const newFriendInfo = queue[0];
        const alreadyExists = this.allFriends().some(
          (f) => f.friendUsername === newFriendInfo.friendUsername
        );
        if (!alreadyExists) {
          const newFriend: Friend = {
            friendUsername: newFriendInfo.friendUsername,
            friendProfilePicture: newFriendInfo.friendProfilePicture,
          };
          this.allFriends.set([newFriend, ...this.allFriends()]);
        }
        newFriendInfoSignal.update((prev) =>
          prev.filter((f) => f.friendUsername !== newFriendInfo.friendUsername)
        );
      }
    });
  }

  ngOnInit(): void {
    this.getFriends();
  }

  getFriends() {
    if (this.loading() || this.noMore()) return;

    this.loading.set(true);

    this.userService
      .getFriendsList(this.offset(), this.limit)
      .subscribe((res) => {
        if (!res.success) {
          toast.error(res.message);
          this.loading.set(false);
          return;
        }

        const page = res.data;
        const current = this.allFriends();
        this.allFriends.set([...current, ...page.content]);

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
      this.getFriends();
    }
  }

  trackByUsername(index: number, friend: Friend): string {
    return friend.friendUsername;
  }
}

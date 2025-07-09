import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SocialService } from '../../services/social.service';
import { toast } from 'ngx-sonner';
import { NgClass, NgIf } from '@angular/common';
import { FriendshipStatus } from '../../auth/data-access/users.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  newFriendInfoSignal,
  usernameRequestOnActionSignal,
} from '../../shared/ui/signals/friendRequestChange.signal';

@Component({
  selector: 'app-user-button',
  imports: [NgIf, NgClass],
  templateUrl: './user-button.component.html',
  styleUrl: './user-button.component.css',
  animations: [
    trigger('slideDown', [
      state(
        'hidden',
        style({
          height: '0px',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      state(
        'visible',
        style({
          height: '*',
          opacity: 1,
        })
      ),
      transition('hidden <=> visible', [animate('200ms ease-in-out')]),
    ]),
  ],
})
export class UserButtonComponent {
  @Input() wrapperClass?: string;
  @Input() wrapperImageClass?: string;
  @Input() friendshipStatus!: FriendshipStatus;
  @Input() username!: string;
  @Input() userProfilePicture!: string;
  showingRequestOptions = false;
  hovering: boolean = false;
  FriendshipStatus = FriendshipStatus;

  constructor(private router: Router, private socialService: SocialService) {}

  goToUserProfile() {
    this.router.navigateByUrl(`/profile/${this.username}`);
  }

  addFriend(event: Event) {
    event.stopPropagation();
    this.socialService.sendFriendRequest(this.username).subscribe((res) => {
      if (!res.success) {
        toast.error(`${res.message}`);
      }
      toast.success(`${res.data}`);
      this.friendshipStatus = FriendshipStatus.PENDING_SENT;
    });
  }

  cancelFriendRequest(event: Event) {
    event.stopPropagation();
    this.socialService.cancelFriendRequest(this.username).subscribe((res) => {
      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success(`${res.data}`);
        this.friendshipStatus = FriendshipStatus.NONE;
      }
    });
  }

  acceptFriendRequest(event: Event) {
    event.stopPropagation();
    this.socialService.acceptFriendRequest(this.username).subscribe((res) => {
      if (!res.success) {
        toast.error(res.message);
      }

      toast.success(`${res.data}`);
      this.friendshipStatus = FriendshipStatus.FRIENDS;

      usernameRequestOnActionSignal.set(this.username);
      newFriendInfoSignal.update((prev) => [
        ...prev,
        {
          friendUsername: this.username,
          friendProfilePicture: this.userProfilePicture,
        },
      ]);
      this.showingRequestOptions = false;
    });
  }

  rejectFriendRequest(event: Event) {
    event.stopPropagation();
    this.socialService.rejectFriendRequest(this.username).subscribe((res) => {
      if (!res.success) {
        toast.error(res.message);
      }
      toast.success(`${res.data}`);
      this.friendshipStatus = FriendshipStatus.NONE;
      usernameRequestOnActionSignal.set(this.username);
      this.showingRequestOptions = false;
    });
  }

  switchShowingFriendRequestOptions(event: Event) {
    event.stopPropagation();
    this.showingRequestOptions = !this.showingRequestOptions;
  }
}

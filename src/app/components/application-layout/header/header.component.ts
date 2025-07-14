import { Component, Input } from '@angular/core';
import { HomeButtonComponent } from '../../home-button/home-button.component';
import { MinimalUserInfo } from '../../../shared/shared.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { FriendshipRequestsListComponent } from '../../friendship-requests-list/friendship-requests-list.component';
import { AuthService } from '../../../auth/data-access/auth.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [HomeButtonComponent, FriendshipRequestsListComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
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
export class HeaderComponent {
  @Input() userLogged!: MinimalUserInfo;
  showFriendRequests = false;

  constructor(private authService: AuthService, private router: Router) {}

  switchShowFriendRequests() {
    const newValue = !this.showFriendRequests;
    this.showFriendRequests = newValue;
  }

  logout() {
    this.authService.logOut().subscribe((res) => {
      if (!res.success) {
        toast.error(res.message);
      }
      toast.success(res.data);
      this.router.navigateByUrl('/auth/sign-in');
    });
  }
}

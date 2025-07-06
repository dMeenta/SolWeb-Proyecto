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

  switchShowFriendRequests() {
    const newValue = !this.showFriendRequests;
    this.showFriendRequests = newValue;
  }
}

import { Component } from '@angular/core';
import { FriendsListComponent } from '../application-layout/aside-menu/friends-list/friends-list.component';
@Component({
  selector: 'app-friends',
  imports: [FriendsListComponent],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css',
})
export class FriendsComponent {}

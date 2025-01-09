import { Component } from '@angular/core';
import { FriendsListComponent } from '../friends-list/friends-list.component';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [FriendsListComponent],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css',
})
export class FriendsComponent {}

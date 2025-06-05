import { Component, Input } from '@angular/core';

export interface Friend {
  friendUid: string;
  friendUsername: string;
  friendProfilePicture: string;
}

@Component({
  selector: 'app-friend-list-object',
  imports: [],
  templateUrl: './friend-list-object.component.html',
  styleUrl: './friend-list-object.component.css',
})
export class FriendListObjectComponent {
  @Input() friend!: Friend;
}

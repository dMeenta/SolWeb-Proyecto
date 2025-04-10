import { Component, effect, inject, input } from '@angular/core';
import { UsersService } from '../../auth/data-access/users.service';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
    selector: 'app-users-list',
    imports: [UserCardComponent],
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  usersList = inject(UsersService).getUsers;
  constructor() {
    effect(() => {
      console.log(this.usersList());
    });
  }
}

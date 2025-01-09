import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../auth/data-access/users.service';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UsersListComponent } from '../../components/users-list/users-list.component';
import { AuthStateService } from '../../shared/auth-state.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [UsersListComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private _userData = inject(UsersService);
  private _userAuth = inject(AuthStateService);
  currentUserData!: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    console.log(userId);
    if (userId) this.getUser(userId);
  }

  async getUser(id: string) {
    const userSnapshot = await this._userData.getUser(id);

    if (!userSnapshot.exists()) return;

    const user = userSnapshot.data();

    this.currentUserData = user;
  }
}

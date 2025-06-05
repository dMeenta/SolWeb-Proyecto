import { Component, Input } from '@angular/core';
import { ROLE } from '../../../shared/shared.service';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-aside-menu',
  imports: [FriendsListComponent, NavbarComponent],
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.css',
})
export class AsideMenuComponent {
  @Input() username!: string;
  @Input() profilePicture!: string;
  @Input() role?: ROLE;
}

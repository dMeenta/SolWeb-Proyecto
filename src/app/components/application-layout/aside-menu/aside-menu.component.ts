import { Component, Input, signal } from '@angular/core';
import { ROLE } from '../../../shared/shared.service';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-aside-menu',
  imports: [FriendsListComponent, NavbarComponent, FormsModule, NgIf],
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.css',
})
export class AsideMenuComponent {
  @Input() username!: string;
  @Input() profilePicture!: string;
  @Input() role?: ROLE;

  searchMode = signal(false);
  searchTerm = signal('');
  currentSearchTerm = signal<string | null>(null);

  submit() {
    if (this.searchTerm().trim()) {
      this.currentSearchTerm.set(this.searchTerm().trim());
    }
  }

  leaveSearchMode() {
    this.searchMode.set(false);
    this.currentSearchTerm.set(null);
    this.searchTerm.set('');
  }

  onSearchMode() {
    this.searchMode.set(true);
    this.currentSearchTerm.set(null);
  }
}

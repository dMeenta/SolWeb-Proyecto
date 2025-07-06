import { Component, OnInit, signal } from '@angular/core';
import {
  UserMinimal,
  UsersService,
} from '../../auth/data-access/users.service';
import { NgForOf, NgIf } from '@angular/common';
import { UserButtonComponent } from '../../components/user-button/user-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-connect-with-others',
  imports: [
    UserButtonComponent,
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './connect-with-others.component.html',
  styleUrl: './connect-with-others.component.css',
})
export class ConnectWithOthersComponent implements OnInit {
  usersList = signal<UserMinimal[]>([]);
  currentPage = signal(0);
  pageSize = signal(10);
  hasMore = signal(true);
  isLoading = signal(false);
  searchTerm = signal('');
  searchMode = signal(false);

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadMoreUsers();
  }

  loadMoreUsers() {
    if (this.isLoading() || !this.hasMore()) return;

    this.isLoading.set(true);
    this.usersService
      .getAllNotFriends(this.currentPage(), this.pageSize())
      .subscribe((res) => {
        if (res.success) {
          this.usersList.update((prev) => [...prev, ...res.data.content]);
          this.currentPage.set(this.currentPage() + 1);
          this.hasMore.set(!res.data.last);
        }
        this.isLoading.set(false);
        this.checkIfNeedMore();
      });
  }

  submit() {
    const username = this.searchTerm().trim();
    if (!username) return;

    this.searchMode.set(true);
    this.isLoading.set(true);
    this.usersService.getUserByUsername(username).subscribe({
      next: (res) => {
        if (res.success) {
          this.usersList.set([
            {
              username: res.data.username,
              profilePicture: res.data.profilePicture,
              friendshipStatus: res.data.friendshipStatus,
            },
          ]);
        } else {
          this.usersList.set([]);
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.usersList.set([]);
        this.isLoading.set(false);
      },
    });
  }

  clearSearch() {
    this.searchTerm.set('');
    this.searchMode.set(false);
    this.currentPage.set(0);
    this.usersList.set([]);
    this.hasMore.set(true);
    this.loadMoreUsers();
  }

  checkIfNeedMore() {
    setTimeout(() => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      if (docHeight <= winHeight && this.hasMore()) {
        this.loadMoreUsers();
      }
    }, 50); // espera a que el DOM renderice
  }
}

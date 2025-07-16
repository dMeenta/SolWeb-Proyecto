import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  UserMinimal,
  UsersService,
} from '../../auth/data-access/users.service';
import { NgForOf, NgIf } from '@angular/common';
import { UserButtonComponent } from '../../components/user-button/user-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollEventService } from '../../services/scroll-event.service';

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
export class ConnectWithOthersComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  usersList = signal<UserMinimal[]>([]);
  currentPage = signal(0);
  pageSize = signal(10);
  hasMore = signal(true);
  isLoading = signal(false);
  searchTerm = signal('');
  searchMode = signal(false);

  onResize = () => {
    this.checkIfNeedMore();
  };

  constructor(
    private usersService: UsersService,
    private readonly scrollEventService: ScrollEventService
  ) {}
  ngOnInit(): void {
    this.loadMoreUsers();
    this.scrollEventService.scroll$.subscribe(() => {
      this.loadMoreUsers();
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.checkIfNeedMore();
    }, 0);

    window.addEventListener('resize', this.onResize);
  }
  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
  }

  loadMoreUsers() {
    if (this.isLoading() || !this.hasMore()) return;

    this.isLoading.set(true);

    const page = this.currentPage();
    const size = this.pageSize();

    if (this.searchMode()) {
      // Modo búsqueda con scroll infinito
      this.usersService
        .searchUsersByUsername(this.searchTerm(), page, size)
        .subscribe((res) => {
          if (res.success) {
            this.usersList.update((prev) => [...prev, ...res.data.content]);
            this.currentPage.set(page + 1);
            this.hasMore.set(!res.data.last);
          }
          this.isLoading.set(false);
          this.checkIfNeedMore();
        });
    } else {
      // Modo normal
      this.usersService.getAllNotFriends(page, size).subscribe((res) => {
        if (res.success) {
          this.usersList.update((prev) => [...prev, ...res.data.content]);
          this.currentPage.set(page + 1);
          this.hasMore.set(!res.data.last);
        }
        this.isLoading.set(false);
        this.checkIfNeedMore();
      });
    }
  }

  submit() {
    const username = this.searchTerm().trim();
    if (!username) return;

    this.searchMode.set(true);
    this.usersList.set([]);
    this.currentPage.set(0);
    this.hasMore.set(true);

    this.loadMoreUsers();
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
      const el = document.scrollingElement || document.documentElement;
      if (!this.hasMore()) return;

      const hasScroll = el.scrollHeight > el.clientHeight;

      if (!hasScroll) {
        this.loadMoreUsers();
      }
    }, 50);
  }
}

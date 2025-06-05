import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  Friend,
  FriendListObjectComponent,
} from '../../../friend-list-object/friend-list-object.component';
import { UsersService } from '../../../../auth/data-access/users.service';
import ApiResponse from '../../../../models/ApiResponse';

@Component({
  selector: 'app-friends-list',
  imports: [NgIf, FriendListObjectComponent, NgFor],
  templateUrl: './friends-list.component.html',
  styleUrl: './friends-list.component.css',
})
export class FriendsListComponent implements OnInit {
  @ViewChild('sentinel', { static: true }) sentinel!: ElementRef;
  friendsList: Friend[] = [];
  offset = 0;
  limit = 10;
  loading = false;
  allLoaded = false;
  observer!: IntersectionObserver;
  constructor(private userService: UsersService) {}
  ngOnInit(): void {
    this.loadFriends(); // carga inicial
    this.setupObserver();
  }

  setupObserver(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.loading && !this.allLoaded) {
          this.loadFriends();
        }
      },
      {
        rootMargin: '100px', // empieza a cargar antes de llegar al fondo
      }
    );
    this.observer.observe(this.sentinel.nativeElement);
  }

  loadFriends(): void {
    this.loading = true;

    this.userService.getFriendsList(this.offset, this.limit).subscribe({
      next: (res: ApiResponse<Friend[]>) => {
        if (!res.success) {
          console.error('Error al cargar amigos:', res.message);
          this.loading = false;
        }

        console.log(res.data);

        const newFriends = res.data;
        this.friendsList = [...this.friendsList, ...newFriends];

        this.offset += this.limit;
        if (newFriends.length < this.limit) {
          this.allLoaded = true;
          this.observer.unobserve(this.sentinel.nativeElement); // detiene la observación
        }

        this.loading = false;
      },
    });
  }
}

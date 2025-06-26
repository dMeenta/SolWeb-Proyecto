import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Game } from '../../models/Game';
import { CommunityService } from '../../services/community.service';
import { NgFor, NgIf } from '@angular/common';
import { GamesService } from '../../services/games.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-communities-bubbles',
  imports: [NgFor, NgIf],
  templateUrl: './user-communities-bubbles.component.html',
  styleUrl: './user-communities-bubbles.component.css',
})
export class UserCommunitiesBubblesComponent implements OnInit, AfterViewInit {
  games: Game[] = [];
  offset = 0;
  limit = 10;
  isLoading = false;
  hasMore = true;
  @ViewChild('scrollContainer', { static: false })
  scrollContainer!: ElementRef;

  constructor(
    private communityService: CommunityService,
    private mom: GamesService,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    this.scrollContainer.nativeElement.addEventListener('scroll', () => {
      this.onScroll();
    });
  }

  ngOnInit(): void {
    this.getUserCommunities();
  }

  onScroll() {
    const container = this.scrollContainer.nativeElement;
    const nearEnd =
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - 100;

    if (nearEnd && !this.isLoading && this.hasMore) {
      this.getUserCommunities();
    }
  }

  scrollIzquierda() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -500,
      behavior: 'smooth',
    });
  }

  scrollDerecha() {
    this.scrollContainer.nativeElement.scrollBy({
      left: 500,
      behavior: 'smooth',
    });
  }

  getUserCommunities() {
    if (this.isLoading || !this.hasMore) return;
    this.isLoading = true;

    this.communityService
      .getCommunitiesByUser(this.offset, this.limit)
      .subscribe({
        next: (res) => {
          const newGames: Game[] = res.data;
          this.games.push(...newGames);
          this.offset += this.limit;
          this.hasMore = newGames.length === this.limit;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error al cargar comunidades:', err);
          this.isLoading = false;
        },
      });
  }

  goToCommunityPage(gameName: String) {
    this.router.navigateByUrl(`game/${gameName}`);
  }
}

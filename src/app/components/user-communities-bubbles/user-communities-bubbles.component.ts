import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Game } from '../../models/Game';
import { CommunityService } from '../../services/community.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-communities-bubbles',
  imports: [NgFor, NgIf],
  templateUrl: './user-communities-bubbles.component.html',
  styleUrl: './user-communities-bubbles.component.css',
})
export class UserCommunitiesBubblesComponent implements OnInit {
  games: Game[] = [];
  offset = 0;
  limit = 10;
  isLoading = false;
  noMore = false;
  @ViewChild('scrollContainer', { static: false })
  scrollContainer!: ElementRef;

  constructor(
    private communityService: CommunityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserCommunities();
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    const nearEnd =
      target.scrollLeft + target.clientWidth >= target.scrollWidth - 10;

    if (nearEnd) {
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
    if (this.isLoading || this.noMore) return;
    this.isLoading = true;

    this.communityService
      .getCommunitiesByUser(this.offset, this.limit)
      .subscribe((res) => {
        if (!res.success) {
          console.error(res);
        }
        const page = res.data;
        const newGames: Game[] = page.content;
        this.games.push(...newGames);
        this.offset += this.limit;
        this.noMore = page.content.length < this.limit;
        this.isLoading = false;
      });
  }

  goToCommunityPage(gameName: String) {
    this.router.navigateByUrl(`community/${gameName}`);
  }
}

import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { Game } from '../../models/Game';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-community-page',
  imports: [],
  templateUrl: './community-page.component.html',
  styleUrl: './community-page.component.css',
})
export class CommunityPageComponent implements OnInit {
  game!: Game;

  constructor(
    private _gameService: GamesService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getGame();
  }

  goBack() {
    this.location.back();
  }

  getGameId() {
    const idString = this.route.snapshot.paramMap.get('id');
    if (!idString) return;
    return Number.parseInt(idString);
  }

  async getGame() {
    const gameId = this.getGameId();
    if (!gameId) return;

    try {
      const item = await firstValueFrom(this._gameService.getGameById(gameId));
      if (!item.success) {
        toast.error(item.message);
      }
      this.game = item.data;
    } catch (err) {
      console.error(err);
    }
  }
}

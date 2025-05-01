import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryComponent } from '../../components/category/category.component';
import { GamesService } from '../../services/games.service';
import { Game } from '../../models/Game';
import { SharedService } from '../../shared/shared.service';
import { CommunityService } from '../../services/community.service';
import { firstValueFrom } from 'rxjs';
import ApiResponse from '../../models/ApiResponse';
import { toast } from 'ngx-sonner';
import { Location } from '@angular/common';

@Component({
  selector: 'app-game-details',
  imports: [CategoryComponent, RouterLink],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.css',
})
export class GameDetailsComponent implements OnInit {
  game!: Game;
  constructor(
    private route: ActivatedRoute,
    private _gameService: GamesService,
    private location: Location,
    private _sharedService: SharedService,
    private _communityService: CommunityService
  ) {}

  ngOnInit(): void {
    this.getGame();
  }

  getGame() {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      const id = Number.parseInt(gameId);
      this._gameService.getGameById(id).subscribe((item) => {
        if (item.success) {
          this.game = item.data;
        }
      });
    } else {
      console.error('ID invalido');
    }
  }

  gameYear() {
    return this.game.release_date.slice(0, 4);
  }

  async joinCommunity() {
    const userId = this._sharedService.getUserLogged()?.uid;
    if (userId) {
      try {
        const response: ApiResponse<any> = await firstValueFrom(
          this._communityService.joinCommunity(userId, this.game.id)
        );

        if (!response.success) {
          toast.error(response.message);
        }
        toast.success(response.message);
      } catch (error) {
        console.error(error);
      }
    }
  }

  goBack() {
    this.location.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryComponent } from '../../components/category/category.component';
import { GamesService } from '../../services/games.service';
import { Game } from '../../models/Game';
import { SharedService } from '../../shared/shared.service';
import { CommunityService } from '../../services/community.service';
import { firstValueFrom } from 'rxjs';
import { toast } from 'ngx-sonner';
import { Location, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-game-details',
  imports: [CategoryComponent, RouterLink, NgIf, NgClass],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.css',
})
export class GameDetailsComponent implements OnInit {
  game!: Game;
  isLoading: boolean = false;
  isInCommunity!: boolean;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private _sharedService: SharedService,
    private _communityService: CommunityService,
    private _gameService: GamesService
  ) {}

  ngOnInit(): void {
    this.getGame();
  }

  goBack() {
    this.location.back();
  }

  getGameName() {
    return decodeURIComponent(this.route.snapshot.paramMap.get('name')!);
  }

  gameYear() {
    return this.game.release_date.slice(0, 4);
  }

  handleButtonCommunityClick() {
    /* if (this.isInCommunity) {
      this.leaveCommunity();
    } else {
      this.joinCommunity();
    } */
  }

  async getGame() {
    const gameName = this.getGameName();

    this.isLoading = true;
    try {
      const item = await firstValueFrom(
        this._gameService.getGameByName(gameName)
      );
      if (item.success) {
        this.game = item.data;
        await this.checkMembership(); // luego de tener el juego
        console.log(item);
        console.log(item.data);
        console.log(item.data.categories);
      } else {
        toast.error(item.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  }

  /* async joinCommunity() {
    const userId = this.getUserId();
    if (!userId) return;

    this.isLoading = true;
    try {
      const gameId = this.getGameId();
      if (!gameId) return;

      const response: ApiResponse<any> = await firstValueFrom(
        this._communityService.joinCommunity(userId, gameId)
      );

      if (!response.success) {
        toast.error(response.message);
        this.isLoading = false;
        return;
      }

      toast.success(response.message);
      this.isLoading = false;
      this.isInCommunity = true;
    } catch (error) {
      console.error(error);
      this.isLoading = false;
    }
  }

  async leaveCommunity() {
    const userId = this.getUserId();
    if (!userId) return;

    this.isLoading = true;

    try {
      const gameId = this.getGameId();
      if (!gameId) return;

      const response: ApiResponse<any> = await firstValueFrom(
        this._communityService.leaveCommunity(userId, gameId)
      );

      if (!response.success) {
        toast.error(response.message);
        this.isLoading = false;
        return;
      }

      toast.success(response.message);
      this.isLoading = false;
      this.isInCommunity = false;
    } catch (error) {
      console.error(error);
      this.isLoading = false;
    }
  } */

  async checkMembership() {
    console.log('Quizas');
    /* const userId = this.getUserId();
    if (!userId) return;

    try {
      const gameId = this.getGameId();
      if (!gameId) return;

      const response = await firstValueFrom(
        this._communityService.checkMembership(userId, gameId)
      );
      this.isInCommunity = response.success ? response.data : false;
      console.log(response);
    } catch (error) {
      console.error(error);
    } */
  }
}

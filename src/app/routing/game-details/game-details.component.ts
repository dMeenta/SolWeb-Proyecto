import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryComponent } from '../../components/category/category.component';
import { GamesService } from '../../services/games.service';
import { Game } from '../../models/Game';
import { SharedService } from '../../shared/shared.service';
import { CommunityService } from '../../services/community.service';
import { firstValueFrom } from 'rxjs';
import ApiResponse from '../../models/ApiResponse';
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

  async getGame() {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (!gameId) return;

    const id = parseInt(gameId);
    this.isLoading = true;
    try {
      const item = await firstValueFrom(this._gameService.getGameById(id));
      if (item.success) {
        this.game = item.data;
        await this.checkMembership(); // luego de tener el juego
      } else {
        toast.error(item.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  }

  gameYear() {
    return this.game.release_date.slice(0, 4);
  }

  handleButtonCommunityClick() {
    if (this.isInCommunity) {
      this.leaveCommunity();
    } else {
      this.joinCommunity();
    }
  }

  async joinCommunity() {
    const userId = this._sharedService.getUserLogged()?.uid;
    if (!userId) return;

    this.isLoading = true;
    try {
      const response: ApiResponse<any> = await firstValueFrom(
        this._communityService.joinCommunity(userId, this.game.id)
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
    const userId = this._sharedService.getUserLogged()?.uid;

    if (!userId) return;

    this.isLoading = true;

    try {
      const response: ApiResponse<any> = await firstValueFrom(
        this._communityService.leaveCommunity(userId, this.game.id)
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
  }

  async checkMembership() {
    const userId = this._sharedService.getUserLogged()?.uid;
    if (!userId) return;

    try {
      const response = await firstValueFrom(
        this._communityService.checkMembership(userId, this.game.id)
      );
      this.isInCommunity = response.success ? response.data : false;
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  goBack() {
    this.location.back();
  }
}

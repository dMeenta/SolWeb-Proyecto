import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryComponent } from '../../components/category/category.component';
import { GamesService } from '../../services/games.service';
import { Game } from '../../models/Game';
import { SharedService } from '../../shared/shared.service';
import { CommunityService } from '../../services/community.service';
import { toast } from 'ngx-sonner';
import { Location, NgClass, NgIf } from '@angular/common';
import { LoaderSpinnerComponent } from '../../components/loader-spinner/loader-spinner.component';

@Component({
  selector: 'app-game-details',
  imports: [
    CategoryComponent,
    RouterLink,
    NgIf,
    NgClass,
    LoaderSpinnerComponent,
  ],
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
    private sharedService: SharedService,
    private communityService: CommunityService,
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
    if (this.isInCommunity) {
      this.leaveCommunity();
    } else {
      this.joinCommunity();
    }
  }

  getGame() {
    const gameName = this.getGameName();

    this.isLoading = true;

    this._gameService.getGameByName(gameName).subscribe((res) => {
      if (!res.success) {
        toast.error(res.message);
      }
      this.game = res.data;
      this.checkMembership();
    });
  }

  joinCommunity() {
    this.isLoading = true;
    this.communityService.joinCommunity(this.game.name).subscribe((res) => {
      if (!res.success) {
        toast.error(res.message);
        this.isLoading = false;
      }

      toast.success(res.message);
      this.isLoading = false;
      this.isInCommunity = true;
    });
  }

  leaveCommunity() {
    this.isLoading = true;
    this.communityService.leaveCommunity(this.game.name).subscribe((res) => {
      if (!res.success) {
        toast.error(res.message);
        this.isLoading = false;
      }

      toast.success(res.message);
      this.isLoading = false;
      this.isInCommunity = false;
    });
  }

  checkMembership() {
    this.isLoading = true;
    this.sharedService.isCommunityMember(this.game.name).subscribe((res) => {
      if (!res.success) {
        toast.error(res.message);
        this.isLoading = false;
      }
      this.isInCommunity = res.data;
      this.isLoading = false;
    });
  }
}

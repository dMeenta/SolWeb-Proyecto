import { Component, OnInit } from '@angular/core';
import { OffersPanelComponent } from '../../components/offers-panel/offers-panel.component';
import { GamesService } from '../../services/games.service';
import { GamesPanelComponent } from '../../components/games-panel/games-panel.component';
import { Game } from '../../models/Game';
import { OffersService } from '../../services/offers.service';
import { Offers } from '../../models/Offers';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [OffersPanelComponent, GamesPanelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  gamesArray!: Game[];
  offersArray!: Offers[];
  constructor(
    private gameService: GamesService,
    private offerSevice: OffersService
  ) {}
  ngOnInit(): void {
    this.gameService.getGames().subscribe((item) => {
      this.gamesArray = item;
    });
    this.offerSevice.getOffers().subscribe((item) => {
      this.offersArray = item;
    });
  }
}

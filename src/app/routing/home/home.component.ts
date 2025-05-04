import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { GamesPanelComponent } from '../../components/games-panel/games-panel.component';
import { Game } from '../../models/Game';
import { Offers } from '../../models/Offers';

@Component({
  selector: 'app-home',
  imports: [GamesPanelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  gamesArray!: Game[];
  offersArray!: Offers[];
  constructor(private gameService: GamesService) {}
  ngOnInit(): void {
    this.gameService.getGames().subscribe((item) => {
      if (item.success) {
        this.gamesArray = item.data;
      }
    });
  }
}

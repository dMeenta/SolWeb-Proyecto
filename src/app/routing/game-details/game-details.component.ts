import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryComponent } from '../../components/category/category.component';
import { GamesService } from '../../services/games.service';
import { Game } from '../../models/Game';

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
    private gameService: GamesService
  ) {}
  ngOnInit(): void {
    this.gameId();
  }

  gameId() {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      const id = Number.parseInt(gameId);
      this.gameService.getGameById(id).subscribe((item) => {
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
}

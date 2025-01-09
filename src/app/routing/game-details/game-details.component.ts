import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryComponent } from '../../components/category/category.component';
import { GamesService } from '../../services/games.service';
import { Game } from '../../models/Game';

@Component({
  selector: 'app-game-details',
  standalone: true,
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
    let gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      const id = +gameId;
      this.gameService.getGameById(id).subscribe((item) => {
        this.game = item;
      });
    } else {
      console.error('No se ha proporcionado un ID válido');
    }
  }

  gameYear() {
    return this.game.release_date.slice(0, 4);
  }
}

import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/Game';
import { GameCardComponent } from '../game-card/game-card.component';
import { GamesService } from '../../services/games.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-games-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './games-panel.component.html',
  styleUrl: './games-panel.component.css',
})
export class GamesPanelComponent implements OnInit {
  games: Game[] = [];
  likedComments: { [gameName: string]: { [index: number]: boolean } } = {};
  likedGames: { [key: string]: boolean } = {};
  currentUserName = 'elnormalpotoski';
  comentarios: { [key: string]: string[] } = {};
  newComment: { [key: string]: string } = {};

  constructor(private gameService: GamesService) {}

  ngOnInit(): void {
    this.gameService.getGames().subscribe({
      next: (data) => {
        this.games = data;
      },
      error: (err) => {
        console.error('Error al cargar las comunidades', err);
      },
    });
  }

  publicarComentario(gameName: string): void {
    const comentario = this.newComment[gameName]?.trim();
    if (comentario) {
      if (!this.comentarios[gameName]) {
        this.comentarios[gameName] = [];
      }
      this.comentarios[gameName].push(comentario);
      this.newComment[gameName] = '';
    }
  }

  toggleLike(gameName: string): void {
    this.likedGames[gameName] = !this.likedGames[gameName];
  }
  toggleCommentLike(gameName: string, index: number): void {
    if (!this.likedComments[gameName]) {
      this.likedComments[gameName] = {};
    }
    this.likedComments[gameName][index] = !this.likedComments[gameName][index];
  }
}

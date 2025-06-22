import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/Game';
import { GamesService } from '../../services/games.service';
import { UsersService } from '../../auth/data-access/users.service';
import { UserMSQL } from '../../models/UserMSQL';
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
  newComment: { [key: string]: string } = {};

  currentUser: UserMSQL | null = null;

  comentarios: {
    [key: string]: { text: string; username: string; profilePicture: string }[];
  } = {};

  constructor(
    private gameService: GamesService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.gameService.getGames().subscribe({
      next: (data) => {
        this.games = data;
      },
      error: (err) => {
        console.error('Error al cargar las comunidades', err);
      },
    });

    // Obtener el usuario autenticado directamente
    this.userService.getCurrentUser().subscribe({
      next: (response) => {
        this.currentUser = response.data;
      },
      error: (err) => {
        console.error('Error al obtener usuario actual', err);
      },
    });
  }

  publicarComentario(gameName: string): void {
    const comentarioTexto = this.newComment[gameName]?.trim();

    if (comentarioTexto && this.currentUser) {
      const nuevoComentario = {
        text: comentarioTexto,
        username: this.currentUser.username,
        profilePicture: this.currentUser.profilePicture,
      };

      if (!this.comentarios[gameName]) {
        this.comentarios[gameName] = [];
      }

      this.comentarios[gameName].push(nuevoComentario);
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

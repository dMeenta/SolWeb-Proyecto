import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { GamesPanelComponent } from '../../components/games-panel/games-panel.component';
import { Game } from '../../models/Game';
import { Offers } from '../../models/Offers';
import { CommunityPageComponent } from '../community-page/community-page.component';
import { GameCardComponent } from '../../components/game-card/game-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GamesPanelComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  @ViewChild('scrollContainer', { static: false })
  scrollContainer!: ElementRef;

  scrollIzquierda() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -500,
      behavior: 'smooth',
    });
  }

  scrollDerecha() {
    this.scrollContainer.nativeElement.scrollBy({
      left: 500,
      behavior: 'smooth',
    });
  }

  games: Game[] = [];

  constructor(private gameService: GamesService) {}
  ngOnInit(): void {
    this.gameService.getGames().subscribe({
      next: (listaGames) => {
        console.log('Juegos cargados:', listaGames);
        this.games = listaGames;
      },
      error: (error) => {
        console.error('Error al cargar los juegos:', error);
      },
    });
  }
}

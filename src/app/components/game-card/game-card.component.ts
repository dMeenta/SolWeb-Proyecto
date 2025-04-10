import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../models/Game';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-game-card',
    imports: [RouterLink],
    templateUrl: './game-card.component.html',
    styleUrl: './game-card.component.css'
})
export class GameCardComponent implements OnInit {
  @Input() game!: Game;
  newFecha!: string;

  ngOnInit(): void {
    this.newFecha = this.formatDate(this.game.release_date);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-GB', options).toUpperCase(); // 'en-GB' para obtener el mes en abreviado
  }

  aa(event: MouseEvent) {
    event.stopPropagation();
    alert('olaaa');
  }
}

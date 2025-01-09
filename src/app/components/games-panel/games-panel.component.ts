import { Component, Input } from '@angular/core';
import { Game } from '../../models/Game';
import { GameCardComponent } from '../game-card/game-card.component';

@Component({
  selector: 'app-games-panel',
  standalone: true,
  imports: [GameCardComponent],
  templateUrl: './games-panel.component.html',
  styleUrl: './games-panel.component.css',
})
export class GamesPanelComponent {
  @Input() games!: Game[];
}

import { Component, Input, OnInit } from '@angular/core';
import { GameOfferCardComponent } from '../game-offer-card/game-offer-card.component';
import { Offers } from '../../models/Offers';
import { GamesService } from '../../services/games.service';
import { Game } from '../../models/Game';

@Component({
    selector: 'app-offers-panel',
    imports: [GameOfferCardComponent],
    templateUrl: './offers-panel.component.html',
    styleUrl: './offers-panel.component.css'
})
export class OffersPanelComponent {
  @Input() offers!: Offers[];
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { GamesPanelComponent } from '../../components/games-panel/games-panel.component';
import { Game } from '../../models/Game';
import { Offers } from '../../models/Offers';
import { CommunityPageComponent } from '../community-page/community-page.component';
import { GameCardComponent } from '../../components/game-card/game-card.component';
import { CommonModule } from '@angular/common';
import { UserCommunitiesBubblesComponent } from '../../components/user-communities-bubbles/user-communities-bubbles.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GamesPanelComponent, CommonModule, UserCommunitiesBubblesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home-button',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './home-button.component.html',
  styleUrl: './home-button.component.css',
})
export class HomeButtonComponent {}

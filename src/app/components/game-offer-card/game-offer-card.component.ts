import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Offers } from '../../models/Offers';

@Component({
    selector: 'app-game-offer-card',
    imports: [RouterLink],
    templateUrl: './game-offer-card.component.html',
    styleUrl: './game-offer-card.component.css'
})
export class GameOfferCardComponent {
  @Input() offer!: Offers;

  constructor(private router: Router) {}
  goGamePage(gameId: number) {
    this.router.navigate([`game/${gameId}`]);
  }

  waza() {
    alert('aaa');
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

  getDiscount(): number {
    const discountQuantity =
      (this.offer.game.price * this.offer.discount) / 100;
    const newPrice = this.offer.game.price - discountQuantity;
    return Number(newPrice.toFixed(2));
  }
}

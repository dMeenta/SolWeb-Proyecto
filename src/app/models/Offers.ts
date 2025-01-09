import { Game } from './Game';

export class Offers {
  id!: number;
  game!: Game;
  discount!: number;
  startDate!: string;
  endDate!: string;
}

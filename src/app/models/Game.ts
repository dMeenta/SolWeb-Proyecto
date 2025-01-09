import { Category } from './Category';

export class Game {
  id!: number;
  name!: string;
  description!: string;
  price!: number;
  release_date!: string;
  developer!: string;
  categories!: Category[];
}

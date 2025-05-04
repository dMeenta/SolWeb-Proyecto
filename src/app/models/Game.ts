import { Category } from './Category';

export class Game {
  id!: number;
  name!: string;
  description!: string;
  release_date!: string;
  developer!: string;
  game_minicard!: string;
  game_wallpaper!: string;
  categories!: Category[];
}

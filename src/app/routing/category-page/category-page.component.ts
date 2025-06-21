import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { Game } from '../../models/Game';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/Category';
import { GameCardComponent } from '../../components/game-card/game-card.component';

@Component({
  selector: 'app-category-page',
  imports: [GameCardComponent],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.css',
})
export class CategoryPageComponent implements OnInit {
  gamesByCategoryArray!: Game[];
  category!: Category;

  constructor(
    private categoryService: CategoriesService,
    private gameService: GamesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const categoryName = this.route.snapshot.paramMap.get('categoryName');
    if (categoryName) {
      this.getGamesByCategoryName(categoryName);
      this.getCategoryByName(categoryName);
    }
  }

  getCategoryByName(categoryName: string) {
    this.categoryService.getCategoryByName(categoryName).subscribe((item) => {
      if (item.success) {
        this.category = item.data;
      }
    });
  }

  getGamesByCategoryName(categoryName: string) {
    this.gameService.getGamesByCategoryName(categoryName).subscribe((item) => {
      if (item.success) {
        this.gamesByCategoryArray = item.data;
      }
    });
  }
}

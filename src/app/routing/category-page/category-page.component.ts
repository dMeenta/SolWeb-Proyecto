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
    const categoryId = this.route.snapshot.paramMap.get('id');
    this.getGamesByCategory(categoryId);
    this.getCategory(categoryId);
  }

  getCategory(categoryId: string | null) {
    if (categoryId) {
      const id = Number.parseInt(categoryId);
      this.categoryService.getCategoryById(id).subscribe((item) => {
        if (item.success) {
          this.category = item.data;
        }
      });
    } else {
      console.error('ID inválido');
    }
  }

  getGamesByCategory(categoryId: string | null) {
    if (categoryId) {
      const id = Number.parseInt(categoryId);
      this.gameService.getGamesByCategory(id).subscribe((item) => {
        if (item.success) {
          this.gamesByCategoryArray = item.data;
        }
      });
    } else {
      console.error('ID inválido');
    }
  }
}

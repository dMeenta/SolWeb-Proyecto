import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/Category';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';

@Component({
    selector: 'app-categories',
    imports: [CategoryCardComponent],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  categoriesArray!: Category[];
  constructor(private categoryService: CategoriesService) {}
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((item) => {
      this.categoriesArray = item;
    });
  }
}

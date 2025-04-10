import { Component, Input } from '@angular/core';
import { Category } from '../../models/Category';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-category',
    imports: [RouterLink],
    templateUrl: './category.component.html',
    styleUrl: './category.component.css'
})
export class CategoryComponent {
  @Input() category!: Category;
}

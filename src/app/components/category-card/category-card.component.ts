import { Component, Input } from '@angular/core';
import { Category } from '../../models/Category';
import { RouterLink } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-category-card',
  imports: [RouterLink],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
  animations: [
    trigger('descriptionAnim', [
      state(
        'hide',
        style({
          opacity: 0,
          transform: 'translateY(20px)',
        })
      ),
      state(
        'show',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      transition('hide => show', animate('300ms ease-out')),
      transition('show => hide', animate('200ms ease-in')),
    ]),
    trigger('contentAnim', [
      state(
        'show',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      state(
        'hide',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
        })
      ),
      transition('show => hide', animate('300ms ease-in')),
      transition('hide => show', animate('300ms ease-out')),
    ]),
  ],
})
export class CategoryCardComponent {
  @Input() category!: Category;
  hovered = false;
}

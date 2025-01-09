import { Routes } from '@angular/router';
import { HomeComponent } from './routing/home/home.component';
import { GameDetailsComponent } from './routing/game-details/game-details.component';
import { CategoriesComponent } from './routing/categories/categories.component';
import { CategoryPageComponent } from './routing/category-page/category-page.component';
import { privateGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    canActivateChild: [],
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes'),
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'categories/:id',
    component: CategoryPageComponent,
  },
  {
    path: 'game/:id',
    component: GameDetailsComponent,
  },
  {
    canActivate: [privateGuard()],
    path: 'profile/:id',
    loadComponent: () =>
      import('./routing/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },
  {
    canActivate: [privateGuard()],
    path: 'library',
    loadComponent: () =>
      import('./routing/library/library.component').then(
        (m) => m.LibraryComponent
      ),
  },
];

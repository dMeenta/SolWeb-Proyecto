import { Routes } from '@angular/router';
import { HomeComponent } from './routing/home/home.component';
import { GameDetailsComponent } from './routing/game-details/game-details.component';
import { CategoriesComponent } from './routing/categories/categories.component';
import { CategoryPageComponent } from './routing/category-page/category-page.component';
import { privateGuard } from './core/auth.guard';
import { ApplicationLayoutComponent } from './components/application-layout/application-layout.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [privateGuard()],
    children: [
      {
        path: '',
        component: ApplicationLayoutComponent,
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
        path: 'profile/:id',
        loadComponent: () =>
          import('./routing/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
      {
        path: 'library',
        loadComponent: () =>
          import('./routing/library/library.component').then(
            (m) => m.LibraryComponent
          ),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes'),
  },
];

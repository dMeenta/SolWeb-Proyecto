import { Routes } from '@angular/router';
import { GameDetailsComponent } from './routing/game-details/game-details.component';
import { CategoriesComponent } from './routing/categories/categories.component';
import { CategoryPageComponent } from './routing/category-page/category-page.component';
import { privateGuard } from './core/auth.guard';
import { ApplicationLayoutComponent } from './components/application-layout/application-layout.component';
import { CommunityPageComponent } from './routing/community-page/community-page.component';
import { HomeComponent } from './routing/home/home.component';
import { MessagesPageComponent } from './routing/messages-page/messages-page.component';

export const routes: Routes = [
  {
    path: '',
    component: ApplicationLayoutComponent,
    canActivate: [privateGuard()],
    children: [
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
        loadChildren: () => import('./routing/profile/features/profile.routes'),
      },
      {
        path: 'community/:id',
        component: CommunityPageComponent,
      },
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'messages',
        component: MessagesPageComponent,
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes'),
  },
];

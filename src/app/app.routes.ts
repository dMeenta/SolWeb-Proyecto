import { Routes } from '@angular/router';
import { GameDetailsComponent } from './routing/game-details/game-details.component';
import { CategoriesComponent } from './routing/categories/categories.component';
import { CategoryPageComponent } from './routing/category-page/category-page.component';
import { privateGuard } from './core/auth.guard';
import { ApplicationLayoutComponent } from './components/application-layout/application-layout.component';
import { CommunityPageComponent } from './routing/community-page/community-page.component';
import { HomeComponent } from './routing/home/home.component';
import { ConnectWithOthersComponent } from './routing/connect-with-others/connect-with-others.component';

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
        path: 'categories/:categoryName',
        component: CategoryPageComponent,
      },
      {
        path: 'game/:name',
        component: GameDetailsComponent,
      },
      {
        path: 'profile/:username',
        loadChildren: () => import('./routing/profile/features/profile.routes'),
      },
      {
        path: 'community/:name',
        component: CommunityPageComponent,
      },
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'users',
        component: ConnectWithOthersComponent,
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes'),
  },
];

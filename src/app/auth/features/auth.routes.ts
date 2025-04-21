import { Routes } from '@angular/router';
import { publicGuard } from '../../core/auth.guard';

export default [
  {
    path: '',
    canActivate: [publicGuard()],
    loadComponent: () =>
      import('./auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      {
        path: 'sign-in',
        loadComponent: () => import('./sign-in/sign-in.component'),
      },
      {
        path: 'sign-up',
        loadComponent: () => import('./sign-up/sign-up.component'),
      },
    ],
  },
] as Routes;

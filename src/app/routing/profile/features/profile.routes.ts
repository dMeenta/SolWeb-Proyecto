import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./profile-layout/profile-layout.component').then(
        (m) => m.ProfileLayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./feed/feed.component').then((m) => m.FeedComponent),
      },
      {
        path: 'communities',
        loadComponent: () =>
          import('./communities/communities.component').then(
            (m) => m.CommunitiesComponent
          ),
      },
      {
        path: 'friends',
        loadComponent: () =>
          import('./friends/friends.component').then((m) => m.FriendsComponent),
      },
    ],
  },
] as Routes;

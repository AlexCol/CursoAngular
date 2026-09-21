import { Route } from '@angular/router';
import { authGuard } from '../guards/auth-guard';

export const eighthRoutes: Route = {
  path: 'eighth',
  loadComponent: () => import('../eighth-component').then((m) => m.EighthComponent),
  children: [
    {
      path: '',
      canMatch: [authGuard],
      pathMatch: 'full',
      loadComponent: () => import('./home').then((m) => m.HomeComponent),
    },
    {
      path: 'login',
      loadComponent: () => import('./login').then((m) => m.LoginComponent),
    },
    {
      path: '**',
      loadComponent: () => import('./not-founded/not-founded').then((m) => m.NotFoundedComponent),
    },
  ],
};

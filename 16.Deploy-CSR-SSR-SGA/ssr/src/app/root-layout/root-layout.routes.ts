import { Route } from '@angular/router';
import { homeRoute } from './home/home.router';

export const rootLayoutRoutes: Route = {
  path: '',
  loadComponent: () => import('./root-layout').then((m) => m.RootLayout),
  children: [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    homeRoute,
  ],
};

import { Route } from '@angular/router';

export const loginRoute: Route = {
  path: 'login',
  loadComponent: () => import('./index').then((m) => m.LoginComponent),
};

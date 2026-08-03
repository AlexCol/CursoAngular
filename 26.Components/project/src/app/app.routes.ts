import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/first-component/first-component').then((m) => m.FirstComponent),
  },
];

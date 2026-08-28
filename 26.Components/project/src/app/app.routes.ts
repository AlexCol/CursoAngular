import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'first',
    loadComponent: () => import('./components/first-component/first-component').then((m) => m.FirstComponent),
  },
  {
    path: 'second',
    loadComponent: () => import('./components/second-component/second-component').then((m) => m.SecondComponent),
  },
  {
    path: 'third',
    loadComponent: () => import('./components/third-component/third-component').then((m) => m.ThirdComponent),
  },
  {
    path: 'forth',
    loadComponent: () => import('./components/forth-component/forth-component').then((m) => m.ForthComponent),
  },
  {
    path: 'fifth',
    loadComponent: () => import('./components/fifth-component/fifth-component').then((m) => m.FifthComponent),
  },
  {
    path: 'sixth',
    loadComponent: () => import('./components/sixth-component/sixth-component').then((m) => m.SixthComponent),
  },
];

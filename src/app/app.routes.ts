import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./pages/list/list.routes').then((m) => m.LIST_ROUTES),
  },
  {
    path: 'statistics',
    loadChildren: () =>
      import('./pages/statistics/statistics.routes').then(
        (m) => m.STATISTICS_ROUTES,
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

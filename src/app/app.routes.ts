import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '/',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./components/search-listing/search-listing.component').then(
        (m) => m.SearchListingComponent,
      );
    },
  },
];

import { Routes } from '@angular/router';
import { SearchListingComponent } from './components/search-listing/search-listing.component';
import { SpeciesEditComponent } from './components/species-edit/species-edit.component';
export const routes: Routes = [
  {
    path: '',
    component: SearchListingComponent,
    title: "Home"
  },
  {
    path: "edit",
    component: SpeciesEditComponent,
    title: "Detail",
  }
];

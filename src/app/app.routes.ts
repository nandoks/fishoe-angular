import { Routes } from '@angular/router';
import { SearchListingComponent } from './components/search-listing/search-listing.component';
import { SpeciesEditComponent } from './components/species-edit/species-edit.component';
import { SpeciesCreationComponent } from './components/species-creation/species-creation.component';
export const routes: Routes = [
  {
    path: '',
    component: SearchListingComponent,
    title: "Home"
  },
  {
    path: "edit/:speciesId",
    component: SpeciesEditComponent,
    title: "Detail",
  },
  {
    path: "create",
    component: SpeciesCreationComponent,
    title: "Create"
  }
];

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Species } from '../../models/species';
import { NgFor } from '@angular/common';
import { Apollo } from 'apollo-angular';
import { SpeciesService } from '../../services/species/species.service';
import { filter, Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Status } from '../../models/enums';

@Component({
  selector: 'app-search-listing',
  imports: [RouterLink, FormsModule, NgFor],
  templateUrl: './search-listing.component.html',
  styleUrl: './search-listing.component.scss',
})
export class SearchListingComponent implements OnInit, OnDestroy {
  private readonly apollo = inject(Apollo);
  private readonly speciesService = inject(SpeciesService);
  private destroy$ = new Subject<void>();
  private router = inject(Router);

  loading = false;
  error: string | null = null;
  species: Species[] = [];
  statusList = Object.values(Status);
  noImageUrl = 'https://dummyimage.com/180x180/c0392b/ffffff&text=No-Image';

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = this.noImageUrl;
  }

  get filteredSpecies(): Species[] {
    return this.formData.status
      ? this.species.filter(
          (specie) => specie.status === this.formData.status,
        )
      : this.species;
  }

  ngOnInit(): void {
    this.loadSpecies();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        // Only reload if we're on the listing page
        if (this.router.url === '/' || this.router.url === '/species') {
          this.loadSpecies();
        }
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadSpecies() {
    this.loading = true;
    this.speciesService
      .getAllSpecies()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.species = data;
          this.loading = false;
        },
        error: (err) => {
          this.error =
            'Failed to load species. Server might be waking up. check logs';
          console.error('Error loading species:', err);
          this.loading = false;
        },
      });
  }

  deleteSpecies(speciesId: number): void {
    if (!confirm('Are you sure you want to delete this species?')) {
      return;
    }
    this.speciesService
      .deleteSpecies(speciesId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (succes) => {
          if (succes) {
            this.species = this.species.filter(
              (specie) => specie.id !== speciesId,
            );
          }
        },
      });
  }

  formData: { textSearch: string; status: Status | string } = {
    textSearch: '',
    status: '',
  };

  search() {
    this.loading = true;
    this.speciesService
      .searchSpecies(this.formData.textSearch)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.species = data;
          this.loading = false;
        },
        error: (err) => {
          this.error =
            'Failed to load species. Server might be waking up. check logs';
          console.error('Error loading species:', err);
          this.loading = false;
        },
      });
  }

  clearSearch() {
    this.formData.textSearch = '';
    this.formData.status = '';
    this.loadSpecies();
  }
}

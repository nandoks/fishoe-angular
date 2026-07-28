import { Component, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Species } from '../../models/species';
import { Family, Genus } from '../../models/enums';
import { NgFor } from '@angular/common';
import { Apollo } from 'apollo-angular';
import { SpeciesService } from '../../services/species/species.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-listing',
  imports: [RouterLink, NgFor],
  templateUrl: './search-listing.component.html',
  styleUrl: './search-listing.component.scss',
})
export class SearchListingComponent implements OnInit, OnDestroy {
  private readonly apollo = inject(Apollo);
  private readonly speciesService = inject(SpeciesService);
  private destroy$ = new Subject<void>();

  loading = true;
  error: string | null = null;
  species: Species[] | undefined = [];
  families = Object.values(Family).sort();
  genusList = Object.values(Genus).sort();

  ngOnInit(): void {
    this.speciesService.getAllSpecies().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.species = data;
        this.loading = false;
      },
      error: (err) => {
        this.error =
          'Failed to load species. Server might be waking up. check logs';
        console.error('Error loading species:', err);
      },
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

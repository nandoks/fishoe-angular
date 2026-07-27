import { Component, inject, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Species } from '../../models/species';
import { Family, Genus } from '../../models/enums';
import { NgFor } from '@angular/common';
import { Apollo } from 'apollo-angular';
import { SpeciesService } from '../../services/species/species.service';

@Component({
  selector: 'app-search-listing',
  imports: [RouterLink, NgFor],
  templateUrl: './search-listing.component.html',
  styleUrl: './search-listing.component.scss',
})
export class SearchListingComponent implements OnInit {
  private readonly apollo = inject(Apollo);
  private readonly speciesService = inject(SpeciesService)
  species: Species[] | undefined = [];
  families = Object.values(Family).sort();
  genusList = Object.values(Genus).sort();

  ngOnInit(): void {
    this.speciesService.getAllSpecies().subscribe({
        next: (data) => {
        this.species = data;
      },
      error: (err) => {
        console.error('Error loading species:', err);
      },
    });
  }
}

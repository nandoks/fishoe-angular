import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CoordinateMapComponent } from './coordinate-map/coordinate-map.component';
import { CoordinateFormComponent } from './coordinate-form/coordinate-form.component';
import { CoordinatesListComponent } from './coordinates-list/coordinates-list.component';
import { DetailFormComponent } from './detail-form/detail-form.component';
import { ActivatedRoute } from '@angular/router';
import { SpeciesService } from '../../services/species/species.service';
import { CoordinateService } from '../../services/coordinates/coordinate.service';
import { Subject, takeUntil } from 'rxjs';
import { Species } from '../../models/species';
import { UpdateSpeciesInput } from '../../graphql/interfaces';

@Component({
  selector: 'app-species-edit',
  imports: [
    CoordinateMapComponent,
    CoordinateFormComponent,
    CoordinatesListComponent,
    DetailFormComponent,
  ],
  templateUrl: './species-edit.component.html',
  styleUrl: './species-edit.component.scss',
})
export class SpeciesEditComponent implements OnInit, OnDestroy {
  
  private route = inject(ActivatedRoute);
  private readonly speciesService = inject(SpeciesService);
  private readonly coordinateService = inject(CoordinateService);
  private destroy$ = new Subject<void>();
  
  loading = false;
  error: string | null = null;
  specie: Species | undefined;

  speciesId!: number;

  ngOnInit(): void {
    this.loading=true
    var speciesId: number;
    this.route.paramMap.subscribe((params) => {
      this.speciesId = Number(params.get('speciesId'));
    });
    this.loadSpecie()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadSpecie(){
    if (this.speciesId) {
      this.speciesService.getSpeciesByID(this.speciesId).subscribe({
        next: (data) => {
          this.specie = data;
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
  };

  handleDeleteCoordinate(coordinateId: number): void {
    if (!confirm('Are you sure you want to delete this coordinate?')) {
      return;
    }

    this.coordinateService
      .deleteCoordinate(coordinateId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (success) => {
          if (success && this.specie) {
            this.specie = {
              ...this.specie,
              coordinates: this.specie.coordinates.filter(
                (coord) => coord.id !== coordinateId,
              ),
            };
          }
        },
      });
  }

  handleAddCoordinate(coordinateData: {
    latitude: number;
    longitude: number;
  }): void {
    if (!this.specie) return;

    this.coordinateService
      .addCoordinate(
        this.specie.id,
        coordinateData.latitude,
        coordinateData.longitude,
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (newCoordinate) => {
          if (this.specie) {
            this.specie = {
              ...this.specie,
              coordinates: [...this.specie.coordinates, newCoordinate],
            };
          }
        },
      });
  }

  handleUpdateSpecies(speciesData: UpdateSpeciesInput) {
    this.speciesService
      .updateSpecies(this.speciesId, speciesData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedSpecies) => {
          this.specie = updatedSpecies;
          alert("Updated succesfully")
        },
      });
  }
}

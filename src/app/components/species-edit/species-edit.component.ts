import { Component, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Species } from '../../models/species';
import { Family, Genus, Status } from '../../models/enums';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoordinateMapComponent } from './coordinate-map/coordinate-map.component';
import { CoordinateFormComponent } from './coordinate-form/coordinate-form.component';
import { CoordinatesListComponent } from './coordinates-list/coordinates-list.component';
import { Apollo } from 'apollo-angular';
import { SpeciesService } from '../../services/species/species.service';
import { CoordinateService } from '../../services/coordinates/coordinate.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-species-edit',
  imports: [
    RouterLink,
    NgFor,
    FormsModule,
    CoordinateMapComponent,
    CoordinateFormComponent,
    CoordinatesListComponent,
  ],
  templateUrl: './species-edit.component.html',
  styleUrl: './species-edit.component.scss',
})
export class SpeciesEditComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private readonly apollo = inject(Apollo);
  private readonly speciesService = inject(SpeciesService);
  private readonly coordinateService = inject(CoordinateService);
  private destroy$ = new Subject<void>();

  specie: Species | undefined;
  families = Object.values(Family).sort();
  genusList = Object.values(Genus).sort();
  statusList = Object.values(Status);

  //families: Family[] = [];
  //genusList: Genus[] = [];
  //statusList: Status[] = []

  speciesId!: number;

  ngOnInit(): void {
    var speciesId: number;
    this.route.paramMap.subscribe((params) => {
      this.speciesId = Number(params.get('speciesId'));
    });

    if (this.speciesId) {
      this.speciesService.getSpeciesByID(this.speciesId).subscribe({
        next: (data) => {
          this.specie = data;
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleDeleteCoordinate(coordinateId: number): void {
    console.log(`deleting coordinate ${coordinateId}`);
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
}

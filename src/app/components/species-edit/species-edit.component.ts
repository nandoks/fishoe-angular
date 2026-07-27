import { Component, inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Species } from '../../models/species';
import { species } from '../../models/dataload';
import { Family, Genus, Status } from '../../models/enums';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoordinateMapComponent } from "./coordinate-map/coordinate-map.component";
import { CoordinateFormComponent } from "./coordinate-form/coordinate-form.component";
import { CoordinatesListComponent } from "./coordinates-list/coordinates-list.component";

@Component({
  selector: 'app-species-edit',
  imports: [RouterLink, NgFor, FormsModule, CoordinateMapComponent, CoordinateFormComponent, CoordinatesListComponent],
  templateUrl: './species-edit.component.html',
  styleUrl: './species-edit.component.scss'
})
export class SpeciesEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  specie: Species | undefined;
  families = Object.values(Family).sort();
  genusList = Object.values(Genus).sort();
  statusList = Object.values(Status)
  speciesId!: number;

  ngOnInit():void {

    this.route.paramMap.subscribe(params => {
        this.speciesId = Number(params.get('speciesId'));
        console.log(this.speciesId);
    })
    this.specie = species.find(s => this.speciesId === s.id)  
    console.log(this.families)
  }
  

  
}

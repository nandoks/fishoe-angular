import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Species } from '../../models/species';
import { species } from '../../models/dataload';
import { Family, Genus } from '../../models/enums';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-species-edit',
  imports: [RouterLink, NgFor, FormsModule],
  templateUrl: './species-edit.component.html',
  styleUrl: './species-edit.component.scss'
})
export class SpeciesEditComponent implements OnInit {
  private route = inject(ActivatedRoute);

  specie: Species | undefined;
  families = Object.values(Family).sort();
  genusList = Object.values(Genus).sort();
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

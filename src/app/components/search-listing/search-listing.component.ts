import { Component, OnInit, Output } from '@angular/core';
import { RouterLink } from "@angular/router";
import { species } from '../../models/dataload';
import { Species } from '../../models/species';
import { Family, Genus } from '../../models/enums';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-search-listing',
  imports: [RouterLink, NgFor],
  templateUrl: './search-listing.component.html',
  styleUrl: './search-listing.component.scss'
})
export class SearchListingComponent implements OnInit{

  species: Species[] = species
  families = Object.values(Family).sort();
  genusList = Object.values(Genus).sort();
  
  ngOnInit(): void {

  }

  


}

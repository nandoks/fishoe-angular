import { inject, Inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Species } from '../../models/species';
import { SpeciesByIdResult, SpeciesQueryResult } from '../../graphql/interfaces';
import { getAllSpeciesQuery, getSpeciesByIdQuery } from '../../graphql/queries';
import { map, Observable } from 'rxjs';
import { deleteSpeciesMutation } from '../../graphql/mutations';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
  private readonly apollo = inject(Apollo);
  species: Species[] | undefined;

  constructor() {}


  getAllSpecies(): Observable<Species[]> {
    return this.apollo
      .query<SpeciesQueryResult>({
        query: getAllSpeciesQuery,
      })
      .pipe(
        map((result) => {
          console.log('Species data:', result.data?.species);
          return result.data?.species || [];
        }),
      );
  }

  getSpeciesByID(id: number){
    return this.apollo
      .query<SpeciesByIdResult>({
        query: getSpeciesByIdQuery,
        variables: {id: id},
      })
      .pipe(
        map((result) => {
          return result.data?.speciesById;
        }),
      );
  }

  deleteSpecies(id: number){
    
    return this.apollo
      .mutate<{ deleteSpecies: boolean}>({
        mutation: deleteSpeciesMutation,
        variables: {id: id}
      })
      .pipe(
        map((result) => {
          return result.data?.deleteSpecies || false;
        })
      );
  }
}

import { inject, Inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Species } from '../../models/species';
import {
  CreateSpeciesInput,
  SearchSpeciesResult,
  SpeciesByIdResult,
  SpeciesQueryResult,
  UpdateSpeciesInput,
  UpdateSpeciesResult,
} from '../../graphql/interfaces';
import { getAllSpeciesQuery, getSpeciesByIdQuery, searchSpecies } from '../../graphql/queries';
import { map, Observable } from 'rxjs';
import {
  createSpeciesMutation,
  deleteSpeciesMutation,
  updateSpeciesMutation,
} from '../../graphql/mutations';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
  private readonly apollo = inject(Apollo);
  species!: Species[];

  constructor() {}

  getAllSpecies(): Observable<Species[]> {
    return this.apollo
      .query<SpeciesQueryResult>({
        query: getAllSpeciesQuery,
        fetchPolicy: 'network-only',
      })
      .pipe(
        map((result) => {
          return result.data?.species || [];
        }),
      );
  }

  getSpeciesByID(id: number) {
    return this.apollo
      .query<SpeciesByIdResult>({
        query: getSpeciesByIdQuery,
        variables: { id: id },
      })
      .pipe(
        map((result) => {
          return result.data?.speciesById;
        }),
      );
  }

  deleteSpecies(id: number) {
    return this.apollo
      .mutate<{ deleteSpecies: boolean }>({
        mutation: deleteSpeciesMutation,
        variables: { id: id },
      })
      .pipe(
        map((result) => {
          return result.data?.deleteSpecies || false;
        }),
      );
  }

  updateSpecies(
    speciesId: number,
    speciesData: UpdateSpeciesInput,
  ): Observable<Species> {
    return this.apollo
      .mutate<UpdateSpeciesResult>({
        mutation: updateSpeciesMutation,
        variables: {
          id: speciesId,
          input: speciesData,
        },
      })
      .pipe(
        map((result) => {
          const updated = result.data?.updateSpecies;
          if (!updated) {
            throw new Error('No data returned from update mutation');
          }
          return updated;
        }),
      );
  }

  createSpecies(input: CreateSpeciesInput): Observable<Number> {
    console.log(input)
    return this.apollo
      .mutate<{ createSpecies: Species }>({
        mutation: createSpeciesMutation,
        variables: {
          input: {
            scientificName: input.scientificName,
            commonName: input.commonName,
            family: input.family,
            genus: input.genus,
            distributionNotes: input.distributionNotes,
            description: input.description,
            imageUrl: input.imageUrl,
          },
        },
      })
      .pipe(
        map((result) => {
          const species = result.data?.createSpecies;
          if (!species) {
            throw new Error('Something went wrong. No species returned from creation');
          }
          return species.id;
        }),
      );
  }

  searchSpecies(text: string): Observable<Species[]>{
    return this.apollo
    .query<SearchSpeciesResult>({
      query: searchSpecies,
      variables: { textInput: text },
    })
    .pipe(
      map((result) => {
        return result.data?.searchSpecies || []
      })
    )
  }
}

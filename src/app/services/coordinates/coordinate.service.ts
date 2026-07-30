import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  addCoordinateMutation,
  deleteCoordinateMutation,
} from '../../graphql/mutations';
import { map, Observable } from 'rxjs';
import { Coordinate } from '../../models/coordinates';

@Injectable({
  providedIn: 'root',
})
export class CoordinateService {
  private readonly apollo = inject(Apollo);

  constructor() {}

  deleteCoordinate(id: number) {
    return this.apollo
      .mutate<{ deleteCoordinate: boolean }>({
        mutation: deleteCoordinateMutation,
        variables: { id: id },
      })
      .pipe(
        map((result) => {
          return result.data?.deleteCoordinate || false;
        }),
      );
  }

  addCoordinate(
    speciesId: number,
    latitude: number,
    longitude: number,
  ): Observable<Coordinate> {
    return this.apollo
      .mutate<{ createCoordinate: Coordinate }>({
        mutation: addCoordinateMutation,
        variables: {
          speciesId: speciesId,
          input: {
            latitude: latitude,
            longitude: longitude,
          },
        },
      })
      .pipe(
        map((result) => {
          const newCoord = result.data?.createCoordinate;
          console.log('Added coordinate:', newCoord);
          return newCoord!;
        }),
      );
  }
}

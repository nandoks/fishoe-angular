import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  addCoordinateMutation,
  deleteCoordinateMutation,
} from '../../graphql/mutations';
import { map, Observable } from 'rxjs';
import { Coordinate } from '../../models/corodinates';

@Injectable({
  providedIn: 'root',
})
export class CoordinateService {
  private readonly apollo = inject(Apollo);

  constructor() {}

  deleteCoordinate(coordinateId: number) {
    return this.apollo
      .mutate<{ deleteCoordinate: boolean }>({
        mutation: deleteCoordinateMutation,
        variables: { id: coordinateId },
      })
      .pipe(
        map((result) => {
          console.log('Coordinate deleted:', result.data?.deleteCoordinate);
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

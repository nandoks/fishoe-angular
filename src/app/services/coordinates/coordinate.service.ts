import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { deleteCoordinateMutation } from '../../graphql/mutations';
import { map } from 'rxjs';

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
}

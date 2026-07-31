import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Coordinate } from '../../../models/coordinates';


@Component({
  selector: 'app-coordinates-list',
  imports: [],
  templateUrl: './coordinates-list.component.html',
  styleUrl: './coordinates-list.component.scss'
})
export class CoordinatesListComponent {
  @Input() coordinates: Coordinate[] = [];
  @Input() loading: boolean = false;
  @Output() deleteCoordinate = new EventEmitter<number>();

  onDelete(coordinateId: number): void {
      this.deleteCoordinate.emit(coordinateId);
  }

}

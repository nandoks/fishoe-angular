import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { Coordinate } from '../../../models/corodinates';
import { CoordinateService } from '../../../services/coordinates/coordinate.service';

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

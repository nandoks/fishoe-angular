import { Component, Input, input } from '@angular/core';
import { Coordinate } from '../../../models/corodinates';

@Component({
  selector: 'app-coordinates-list',
  imports: [],
  templateUrl: './coordinates-list.component.html',
  styleUrl: './coordinates-list.component.scss'
})
export class CoordinatesListComponent {
  @Input() coordinates: Coordinate[] = [];

}

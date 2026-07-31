import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-coordinate-form',
  imports: [FormsModule],
  templateUrl: './coordinate-form.component.html',
  styleUrl: './coordinate-form.component.scss',
})
export class CoordinateFormComponent {
  @Output() addCoordinate = new EventEmitter<{
    latitude: number;
    longitude: number;
  }>();

  latitude: number | null = null;
  longitude: number | null = null;

  onAdd(): void {
    if (this.latitude !== null && this.longitude !== null) {
      this.addCoordinate.emit({
        latitude: this.latitude,
        longitude: this.longitude,
      });
      this.latitude = null;
      this.longitude = null;
    }
  }
}

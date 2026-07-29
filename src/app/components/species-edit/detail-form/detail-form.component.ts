import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Species } from '../../../models/species';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Status } from '../../../models/enums';
import { UpdateSpeciesInput } from '../../../graphql/interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detail-form',
  imports: [NgFor, FormsModule, RouterLink],
  templateUrl: './detail-form.component.html',
  styleUrl: './detail-form.component.scss',
})
export class DetailFormComponent implements OnChanges {
  @Input() specie!: Species;
  @Output() updateSpecies = new EventEmitter<UpdateSpeciesInput>();
  formData: Species | null = null;
  statusList = Object.values(Status);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['specie'] && this.specie) {
      this.formData = {
        ...this.specie,
        coordinates: this.specie.coordinates
          ? [...this.specie.coordinates]
          : [],
      };
    }
  }
  onSave(): void {
    if (!this.formData) return;

    const input: UpdateSpeciesInput = {
      scientificName: this.formData.scientificName,
      commonName: this.formData.commonName,
      family: this.formData.family,
      genus: this.formData.genus,
      distributionNotes: this.formData.distributionNotes,
      description: this.formData.description,
      status: this.formData.status,
      imageUrl: this.formData.imageUrl,
    };
    this.updateSpecies.emit(input);
  }
}

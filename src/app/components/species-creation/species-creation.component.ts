import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateSpeciesInput } from '../../graphql/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { SpeciesService } from '../../services/species/species.service';

@Component({
  selector: 'app-species-creation',
  imports: [FormsModule],
  templateUrl: './species-creation.component.html',
  styleUrl: './species-creation.component.scss',
})
export class SpeciesCreationComponent {
  private readonly speciesService = inject(SpeciesService);

  saving = false;
  error: string | null = null;
  private router = inject(Router);

  formData: CreateSpeciesInput = {
    scientificName: 'Scientificus Namus',
    commonName: 'CrowdFish',
    family: 'Fish-o-family',
    genus: 'Genes',
    distributionNotes: 'Can be found at bikinibottom',
    description: 'This fish exists for sure',
    imageUrl: '',
  };

  onSave() {
    if (!this.formData) return;
    this.saving = true;

    this.speciesService.createSpecies(this.formData).subscribe({
      next: (id) => {
        console.log(id)
        this.saving = false;
        this.router.navigate(['/edit', id]);
      },
      error: (err) => {
        this.error = 'Failed to create species. Please try again.';
        this.saving = false;
      },
    });
  }
}

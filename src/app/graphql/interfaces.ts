import { Status } from '../models/enums';
import { Species } from '../models/species';

export interface SpeciesQueryResult {
  species: Species[];
}

export interface SpeciesByIdResult {
  speciesById: Species;
}

export interface UpdateSpeciesResult {
  updateSpecies: Species;
}

export interface UpdateSpeciesInput {
  scientificName?: string;
  commonName?: string;
  family?: string;
  genus?: string;
  distributionNotes?: string;
  description?: string;
  status?: Status,
  imageUrl?: string;
}

export interface CreateSpeciesInput {
  scientificName: string;
  commonName: string;
  family: string;
  genus: string;
  distributionNotes: string;
  description: string;
  imageUrl?: string;
}

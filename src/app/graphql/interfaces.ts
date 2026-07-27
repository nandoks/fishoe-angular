import { Species } from '../models/species';

export interface SpeciesQueryResult {
    species: Species[];
}

export interface SpeciesByIdResult {
    speciesById: Species;
}
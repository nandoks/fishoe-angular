import { gql } from 'apollo-angular';

// ##### START delete mutations #####
export const deleteCoordinateMutation = gql`
  mutation DeleteCoordinate($id: ID!) {
    deleteCoordinate(id: $id)
  }
`;

export const deleteSpeciesMutation = gql`
  mutation DeleteSpecies($id: ID!) {
    deleteSpecies(id: $id)
  }
`;

// ##### END delete mutations #####

// ##### START create mutations #####
export const addCoordinateMutation = gql`
  mutation AddCoordinate($speciesId: ID!, $input: CreateCoordinateInput!) {
    createCoordinate(speciesId: $speciesId, input: $input) {
      id
      latitude
      longitude
    }
  }
`;

export const createSpeciesMutation = gql`
  mutation CreateSpecies($input: CreateSpeciesInput!) {
    createSpecies(input: $input) {
      id
    }
  }
`;

// ##### END create mutations #####

// ##### START update mutations #####
export const updateSpeciesMutation = gql`
  mutation UpdateSpecies($id: ID!, $input: UpdateSpeciesInput!) {
    updateSpecies(id: $id, input: $input) {
      id
      scientificName
      commonName
      family
      genus
      distributionNotes
      description
      status
      imageUrl
      coordinates {
        id
        latitude
        longitude
      }
    }
  }
`;

// ##### END update mutations #####

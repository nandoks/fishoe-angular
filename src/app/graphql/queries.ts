import { gql } from 'apollo-angular';

export const getAllSpeciesQuery = gql`
  query allSpecies {
    species {
      id
      commonName
      description
      distributionNotes
      family
      genus
      imageUrl
      status
      scientificName
      coordinates {
        id
        latitude
        localityName
        longitude
      }
    }
  }
`;

export const getSpeciesByIdQuery = gql`
  query speciesById($id: ID!) {
    speciesById(id: $id) {
      commonName
      coordinates {
        id
        latitude
        longitude
        localityName
      }
      description
      distributionNotes
      family
      genus
      id
      imageUrl
      scientificName
      status
    }
  }
`;

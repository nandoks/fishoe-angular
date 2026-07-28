import { gql } from 'apollo-angular';

// ##### START delete mutations #####
export const deleteCoordinateMutation = gql`
    mutation DeleteCoordinate($id: ID!) {
        deleteCoordinate(id: $id)
    }
`;

export const deleteSpeciesMutation = gql`
    mutation DeleteSpecies($id: ID!){
        deleteSpecies(id: $id)
    }
`


// ##### END delete mutations #####

// ##### START add mutations #####
export const addCoordinateMutation = gql`
    mutation AddCoordinate($speciesId: ID!, $input: CreateCoordinateInput!) {
        createCoordinate(speciesId: $speciesId, input: $input) {
            id
            latitude
            longitude
        }
    }
`;

// ##### END add mutations #####
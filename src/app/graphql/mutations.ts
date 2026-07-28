import { gql } from 'apollo-angular';

export const deleteCoordinateMutation = gql`
    mutation DeleteCoordinate($id: ID!) {
        deleteCoordinate(id: $id)
    }
`;


export const addCoordinateMutation = gql`
    mutation AddCoordinate($speciesId: ID!, $input: CreateCoordinateInput!) {
        createCoordinate(speciesId: $speciesId, input: $input) {
            id
            latitude
            longitude
        }
    }
`;
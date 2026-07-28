import { gql } from 'apollo-angular';

export const deleteCoordinateMutation = gql`
    mutation DeleteCoordinate($id: ID!) {
        deleteCoordinate(id: $id)
    }
`;

import { gql } from "@apollo/client";

export const GET_USERS = gql`
{
    allUsers {
        id
        firstName
        lastName
    }
}
`;

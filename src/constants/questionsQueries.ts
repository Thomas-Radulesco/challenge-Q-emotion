import { gql } from "@apollo/client";

export const GET_QUESTIONS = gql`
{
    allQuestions {
        id
        question
        text
        User {
            firstName
            lastName
        }
    }
}
`;

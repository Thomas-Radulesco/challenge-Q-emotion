import { gql } from "@apollo/client";

export const GET_QUESTIONS = gql`
query getQuestion($q: String) {
    allQuestions(filter: {q: $q}) {
        id
        question
        text
        user_id
        User {
            id
            firstName
            lastName
        }
    }
}
`;
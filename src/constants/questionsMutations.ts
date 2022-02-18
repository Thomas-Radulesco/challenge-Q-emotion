import { gql } from "@apollo/client";

export const NEW_QUESTION = gql`
mutation createNewQuestion($question: String!, $text: String!, $user_id: ID!) {
    createQuestion(question: $question, text: $text, user_id: $user_id) {
        id
        question
        text
        user_id
    }
}
`;

export const DELETE_QUESTION = gql`
mutation deleteQuestion($id: ID!){
    removeQuestion(id: $id) {
        id
        question
        text
        user_id
    }
  }
`;

export const UPDATE_QUESTION = gql`
mutation updateQuestion($id: ID!, $question: String, $text: String, $user_id: ID!){
    updateQuestion(id: $id, question: $question, text: $text, user_id: $user_id) {
        question
        text
        User {
          id
          firstName
          lastName
        }
      }
  }
`;
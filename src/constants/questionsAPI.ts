import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";
  
export const client = new ApolloClient({
uri: 'http://localhost:3001',
cache: new InMemoryCache()
});

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

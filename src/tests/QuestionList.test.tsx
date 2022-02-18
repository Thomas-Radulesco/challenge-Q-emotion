import { render, act } from "@testing-library/react";
import { MockedProvider } from '@apollo/client/testing';
import { GET_QUESTIONS } from "../constants/questionsQueries";
import QuestionList from "../features/questionList/QuestionList";
import { questionMockData } from './questionMocks';

const mocks = [
  {
    request: {
      query: GET_QUESTIONS
    },
    result: questionMockData,
  },
];


describe("Question List component", () => {
  it("The question list is rendered", async () => {
    setTimeout(() => {
      let div;
        const { getByTestId } = render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <QuestionList />
          </MockedProvider>,
        );
        div = getByTestId("questionList");
      expect(div).toBeTruthy();
    }, 100)
  });
});
import { render, act, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing';
import { GET_QUESTIONS } from "../constants/questionsQueries";
import QuestionList from "../features/questionList/QuestionList";
import { questionMockData } from './questionMocks';
import Question from "../features/questionList/Question";

const mocks = [
  {
    request: {
      query: GET_QUESTIONS
    },
    result: questionMockData,
  },
];


describe("Question List component", () => {
  it("is rendered", async () => {
    setTimeout(() => {
      let questionList, question;
        const { getByTestId } = render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <QuestionList />
          </MockedProvider>,
        );
        questionList = getByTestId("questionList");
        question = getByTestId("question");
      expect(questionList).toBeTruthy();
      expect(question).toBeTruthy();
    }, 100);
  });
});

describe("Question component", () => {
  it("is rendered", () => {
    setTimeout(() => {
      let question;
      const {getByTestId} = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Question />
        </MockedProvider>,
      );
      question = getByTestId("question");
      expect(question).toBeTruthy();
    }, 100);
  })
})

describe("Actions component", () => {
  it("is rendered", async () => {
    setTimeout(() => {
      let actions: any;
      const {getByTestId} = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Question />
        </MockedProvider>,
      );
      actions = getByTestId("actions");
      expect(actions).toBeTruthy();
    }, 100);
  });

  it("asks confirmation when click on delete", async () => {
    await act(async () => {
      setTimeout( async () => {
        let deleteButton;
        const { getByLabelText } = render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <Question />
          </MockedProvider>,
        );
        deleteButton = getByLabelText("deleteButton");
        await fireEvent.click(deleteButton);
        expect(window.confirm).toBeCalled();
        expect(window.confirm.arguments).toContain("Êtes-vous sûr de vouloir supprimer la question");
        // waitFor(() => screen.getByRole('confirm'));
      }, 100);
      
    });
  });
});
import React from 'react';
import { render, act } from "@testing-library/react";
import { Provider } from 'react-redux';
import { MockedProvider } from '@apollo/client/testing';
import { GET_QUESTIONS } from "../constants/questionsQueries";
import { store } from '../app/store';
import App from '../App';
import { questionMockData } from './questionMocks';

const mocks = [
  {
    request: {
      query: GET_QUESTIONS
    },
    result: questionMockData,
  },
];

describe("Question List and Question Form components are rendered", () => {
  it("The question list and the question form components are rendered", () => {
    
    setTimeout(() => {
      let questionList, questionForm;
        const { getByTestId } = render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <Provider store={store}>
              <App />
            </Provider>
          </MockedProvider>,
        );
        questionList = getByTestId("questionList");
        questionForm = getByTestId("questionForm");
      expect(questionList).toBeTruthy();
      expect(questionForm).toBeTruthy();

    }, 100)
  });
});
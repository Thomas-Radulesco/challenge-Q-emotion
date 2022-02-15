import { createSlice } from '@reduxjs/toolkit';

export interface QuestionsState {
  questions: Array<string>;
  error: any,
  status: 'idle' | 'loading' | 'failed';
}

const initialState: QuestionsState = {
  questions: [],
  error: {},
  status: 'idle',
};

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},
});

export default questionsSlice.reducer;

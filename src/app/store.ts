import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import questionsReducer from '../features/questionList/questionListSlice';
import formReducer from '../features/questionForm/questionFormSlice';

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
    form: formReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import questionListReducer from '../features/questionList/questionListSlice';

export const store = configureStore({
  reducer: questionListReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

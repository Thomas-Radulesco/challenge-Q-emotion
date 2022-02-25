import { createSlice } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface QuestionsState {
  openSearch: boolean,
  openAdd: boolean;

}

const initialState: QuestionsState = {
  openSearch: false,
  openAdd: false,

};

export const questionListSlice = createSlice({
  name: 'questionList',
  initialState,
  reducers: {
    toggleOpenSearch: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.openSearch= !state.openSearch;
      state.openAdd= false;
    },
    toggleOpenAdd: (state) => {
      state.openAdd= !state.openAdd;
      state.openSearch= false;
    },
  },
});

export const selectOpenSearch = (state: RootState) => state.openSearch;
export const selectOpenAdd = (state: RootState) => state.openAdd;

export const { toggleOpenSearch, toggleOpenAdd } = questionListSlice.actions;

export default questionListSlice.reducer;

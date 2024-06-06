/** 모달에 관한 reducer를 관리할 겁니당 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: []
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.modalOptions = action.payload;
    }
  }
});

export const { addComment } = commentSlice.actions;

export default commentSlice.reducer;

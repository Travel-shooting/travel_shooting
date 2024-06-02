/** 데이터에 관한 Reducer를 여기서 관리할 것입니당 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {},
    modifyPost: (state, action) => {},
    deletePost: (state, action) => {},
  },
});

export const { addPost, modifyPost, deletePost } = postSlice.actions;

export default postSlice.reducer;

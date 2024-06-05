/** 유저에 관한 reducer를 관리할 겁니당 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postUser: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.postUser = action.payload;
    },
    addUser: (state, action) => {},
  },
});

export const { addUser, loadUser } = userSlice.actions;

export default userSlice.reducer;

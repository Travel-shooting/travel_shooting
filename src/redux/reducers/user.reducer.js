/** 유저에 관한 reducer를 관리할 겁니당 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {},
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;

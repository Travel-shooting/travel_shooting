/** 모달에 관한 reducer를 관리할 겁니당 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logInUser: null,
};

const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.logInUser = action.payload;
    },
    logOut: (state) => {
      state.logInUser = null;
    },
  },
});

export const { logIn, logOut } = logSlice.actions;

export default logSlice.reducer;

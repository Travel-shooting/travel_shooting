import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  postUser: {}
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.postUser = action.payload;
    }
  }
});

export const { loadUser } = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalOptions: null
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state, action) => {
      state.modalOptions = action.payload;
    },
    close: (state) => {
      state.modalOptions = null;
    }
  }
});

export const { open, close } = modalSlice.actions;

export default modalSlice.reducer;

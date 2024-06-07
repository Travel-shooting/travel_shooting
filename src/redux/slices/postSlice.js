import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loadData: JSON.parse(localStorage.getItem('loadData')) || [],
  formData: {},
  tags: [],
  previewImages: [],
  realImageFiles: [],
  country: ''
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    loadPost: (state, action) => {
      state.loadData = action.payload;
    },
    addPost: (state, action) => {
      state.formData = action.payload;
    },
    deletePost: (state, action) => {
      state.loadData = action.payalod;
    },
    manageTags: (state, action) => {
      state.tags = action.payload;
    },
    manageImages: (state, action) => {
      state.previewImages = action.payload;
    },
    manageRealImages: (state, action) => {
      state.realImageFiles = action.payload;
    },
    manageCountry: (state, action) => {
      state.country = action.payload;
    }
  }
});

export const { loadPost, addPost, deletePost, manageTags, manageImages, manageRealImages, manageCountry } =
  postSlice.actions;

export default postSlice.reducer;

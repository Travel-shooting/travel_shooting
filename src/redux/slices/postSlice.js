/** 데이터에 관한 Reducer를 여기서 관리할 것입니당 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {},
  tags: [],
  previewImages: [],
  realImageFiles: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.formData = action.payload;
    },
    modifyPost: (state, action) => {},
    deletePost: (state, action) => {},
    manageTags: (state, action) => {
      state.tags = action.payload;
    },
    manageImages: (state, action) => {
      state.previewImages = action.payload;
    },
    manageRealImages: (state, action) => {
      state.realImageFiles = action.payload;
    },
  },
});

export const {
  addPost,
  modifyPost,
  deletePost,
  manageTags,
  manageImages,
  manageRealImages,
} = postSlice.actions;

export default postSlice.reducer;

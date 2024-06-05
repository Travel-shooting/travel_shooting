/** 데이터에 관한 Reducer를 여기서 관리할 것입니당 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadData: [],
  formData: {},
  tags: [],
  previewImages: [],
  realImageFiles: [],
  totalData: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    loadPost: (state, action) => {
      state.loadData = action.payload;
    },
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
    addHeart: (state) => {
      state.formData.postLike += 1;
    },
  },
});

export const {
  loadPost,
  addPost,
  modifyPost,
  deletePost,
  manageTags,
  manageImages,
  manageRealImages,
  addHeart,
} = postSlice.actions;

export default postSlice.reducer;

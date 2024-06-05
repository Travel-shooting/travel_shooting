/** 데이터에 관한 Reducer를 여기서 관리할 것입니당 */

import { createSlice } from "@reduxjs/toolkit";
import supabase from "../../util/supabase/supabaseClient";

const initialState = {
  posts: [],
  signIn: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    searchPost: (state, action) => {
      return {
        ...state,
        posts: state.posts.filter((post) =>
          post.country.includes(action.payload)
        ),
      };
    },
    modifyPost: (state, action) => {
      const { id, newData } = action.payload;
      const index = state.posts.findIndex((post) => post.id === id);
      if (index !== -1) {
        state.posts[index] = { ...state.posts[index], ...newData };
      }
    },
    deletePost: (state, action) => {
      const id = action.payload;
      state.posts = state.posts.filter((post) => post.id !== id);
    },
  },
});

export const { addPost, searchPost, modifyPost, deletePost } =
  postSlice.actions;

export default postSlice.reducer;

export const fetchPosts = () => async (dispatch) => {
  const { data } = await supabase.from("posts").select("*");
  dispatch(setPosts(data));
};

export const setPosts = (posts) => ({
  type: "post/setPosts",
  payload: posts,
});

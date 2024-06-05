import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [], //댓글 목록을 저장할 배열
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    addComment: (state, action) => {
      const newComment = action.payload;
      state.comments.push(newComment);
    },
    deleteComment: (state, action) => {
      const commentId = action.payload;
      state.comments = state.comments.filter(
        (comment) => comment.id !== commentId
      );
    },
    updateComment: (state, action) => {
      const { id, text } = action.payload;
      const existingComment = state.comments.find(
        (comment) => comment.id === id
      );
      if (existingComment) {
        existingComment.text = text;
      }
    },
  },
});

export const { addComment, deleteComment, updateComment } =
  commentSlice.actions;

export default commentSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./reducers/post.reducer";
import userReducer from "./reducers/user.reducer";

const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
  },
});

export default store;

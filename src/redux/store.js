import { configureStore } from "@reduxjs/toolkit";
import logReducer from "./reducers/log.reducer";
import postReducer from "./reducers/post.reducer";
import userReducer from "./reducers/user.reducer";

const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
    log: logReducer,
  },
});

export default store;

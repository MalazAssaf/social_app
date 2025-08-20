import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "../features/posts/PostSlice";
export default configureStore({
  reducer: { posts: postsSlice },
});

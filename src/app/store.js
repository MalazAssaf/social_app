import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "../features/posts/PostSlice";
import authSlice from "../features/auth/AuthSlice";
import uiSlice from "../features/ui/UiSlice";
import userSlice from "../features/users/UserSlice";

export default configureStore({
  reducer: { posts: postsSlice, auth: authSlice, ui: uiSlice, user: userSlice },
});

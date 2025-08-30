import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import { createPost, deletePost, addComment } from "../posts/PostSlice";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data, thunkAPI) => {
    const formDataToSend = new FormData();
    formDataToSend.append("username", data.username);
    formDataToSend.append("password", data.password);
    formDataToSend.append("name", data.name);
    formDataToSend.append("email", data.email);
    if (data.image instanceof File) {
      formDataToSend.append("image", data.image);
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}register`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const logInUser = createAsyncThunk(
  "user/logInUser",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_BASE_URL}login`, {
        username: data.username,
        password: data.password,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const logOutUser = createAsyncThunk(
  "user/logOut",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    const response = await axios.post(
      `${API_BASE_URL}logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    token: localStorage.getItem("token") || null,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        state.userData = action.payload.user;
      })
      // Login
      .addCase(logInUser.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        state.userData = action.payload.user;
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.userData = null;
        state.token = null;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        state.userData = null;
        state.token = null;
      })
      // Delete Post
      .addCase(deletePost.fulfilled, (state) => {
        if (state.userData && state.userData.posts_count > 0) {
          state.userData.posts_count = state.userData.posts_count - 1;
        }
      })
      // Create Post
      .addCase(createPost.fulfilled, (state) => {
        if (state.userData) {
          state.userData.posts_count = state.userData.posts_count + 1;
        }
      })
      // Add Comment
      .addCase(addComment.fulfilled, (state) => {
        if (state.userData) {
          state.userData.comments_count = state.userData.comments_count + 1;
        }
      });
  },
});

export default authSlice.reducer;

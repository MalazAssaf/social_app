import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ page = 1, limit = 5 }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}posts?page=${page}&limit=${limit}`
      );
      return {
        posts: response.data.data,
        page: page,
        totalPages: response.data.meta?.last_page || 1,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const fetchPostOfUser = createAsyncThunk(
  "posts/fetchPostsOfUser",
  async (id) => {
    return axios
      .get(`${API_BASE_URL}users/${id}/posts`)
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return error;
      });
  }
);

export const fetchPostDetails = createAsyncThunk(
  "posts/fetchPostDetails",
  async (id) => {
    return axios
      .get(`${API_BASE_URL}posts/${id}`)
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        return error;
      });
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (data, thunkAPI) => {
    const token = getToken(thunkAPI);
    const formDataToSend = new FormData();
    formDataToSend.append("title", data.title);
    formDataToSend.append("body", data.body);
    if (data.image instanceof File) {
      formDataToSend.append("image", data.image);
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}posts`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Creating New Post Failed!"
      );
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, thunkAPI) => {
    try {
      const token = getToken(thunkAPI);
      await axios.delete(`${API_BASE_URL}posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // return postId so we know what to remove in reducer
      return postId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to delete post"
      );
    }
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async (data, thunkAPI) => {
    // Since The API Does Not Accept Put Request Directly!
    const token = getToken(thunkAPI);
    const formDataToEdit = new FormData();
    formDataToEdit.append("_method", "put");
    formDataToEdit.append("title", data.title);
    formDataToEdit.append("body", data.body);
    if (data.image instanceof File) {
      formDataToEdit.append("image", data.image);
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}posts/${data.postId}`,
        formDataToEdit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
);

export const addComment = createAsyncThunk(
  "posts/addcomment",
  async (data, thunkAPI) => {
    const token = getToken(thunkAPI);
    const body = { body: data.body };
    const response = await axios.post(
      `${API_BASE_URL}posts/${data.id}/comments`,
      body,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  }
);

function getToken(thunkAPI) {
  const state = thunkAPI.getState();
  const token = state.auth.token;
  return token;
}

const postSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    itemsOfUser: [],
    postDetails: [],
    commentsOfPost: [],
    accountDetails: null,
    error: null,
    stateOfFetchingUsersPost: "idle",
    page: 1,
    totalPages: 1,
    status: "idle", // idle | loading | succeeded | failed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Append new posts instead of replacing
        state.items = [...state.items, ...action.payload.posts];
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        // Add the Posted Post to the Post List
        state.items.unshift(action.payload);
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        // Remove the Post From the Post List
        state.items = state.items.filter((item) => item.id !== action.payload);
        // Remove the Post From a Specific User
        state.itemsOfUser = state.itemsOfUser.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(editPost.fulfilled, (state, action) => {
        // Edit the Post in the Post List
        state.items = state.items.map((item) =>
          // Edit the Updated Post in the List
          item.id === action.payload.id ? action.payload : item
        );
        // Edit Post of a Specific User
        state.itemsOfUser = state.itemsOfUser.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(fetchPostOfUser.fulfilled, (state, action) => {
        state.itemsOfUser = action.payload;
        state.accountDetails = action.payload[0];
        state.stateOfFetchingUsersPost = "succeeded";
      })
      .addCase(fetchPostOfUser.pending, (state) => {
        state.itemsOfUser = [];
        state.accountDetails = null;
        state.stateOfFetchingUsersPost = "loading";
      })
      .addCase(fetchPostDetails.pending, (state) => {
        state.postDetails = [];
        state.commentsOfPost = [];
        state.status = "loading";
      })
      .addCase(fetchPostDetails.fulfilled, (state, action) => {
        // Since API Request Returns Object, So I Embraced it by []
        // So it Works in Post Component Since the Later Requires Array!
        state.postDetails = [action.payload];
        state.commentsOfPost = state.postDetails[0].comments;
        state.status = "succeeded";
      })
      .addCase(fetchPostDetails.rejected, (state, action) => {
        state.postDetails = [];
        state.commentsOfPost = [];
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.commentsOfPost.unshift(action.payload);
        state.status = "succeeded";
      });
  },
});

export default postSlice.reducer;

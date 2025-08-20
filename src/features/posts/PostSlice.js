import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = "https://tarmeezacademy.com/api/v1/";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return axios
    .get(`${apiKey}posts?limit=20`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
});

const postSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    status: "idle",
    isLoading: true,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.isLoading = false;
      });
  },
});
export default postSlice.reducer;

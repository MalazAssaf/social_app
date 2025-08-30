import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

export const fetchUserInfo = createAsyncThunk(
  "users/fetchUserInfo",
  async (id) => {
    return axios
      .get(`${API_BASE_URL}users/${id}`)
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        throw error;
      });
  }
);
const userSlice = createSlice({
  name: "posts",
  initialState: {
    userInfo: null,
    state: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.state = "succeeded";
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.userInfo = null;
        state.state = "failed";
      })
      .addCase(fetchUserInfo.pending, (state) => {
        state.userInfo = null;
        state.state = "loading";
      });
  },
});

export default userSlice.reducer;

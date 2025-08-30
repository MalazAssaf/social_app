import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isLoading: false,
    isLoggedIn: localStorage.getItem("token") !== null,
    status: "idle", // Might Delete it Later
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addMatcher(
        (action) =>
          action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          state.status = action.type.endsWith("/fulfilled")
            ? "succeeded"
            : "failed";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) =>
          action.type === "user/logInUser/fulfilled" ||
          action.type === "user/registerUser/fulfilled",
        (state) => {
          state.isLoggedIn = true;
        }
      )
      .addMatcher(
        (action) => action.type === "user/logOut/fulfilled",
        (state) => {
          state.isLoggedIn = false;
        }
      );
  },
});

export default uiSlice.reducer;

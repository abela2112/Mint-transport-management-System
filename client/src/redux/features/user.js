import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  token: "",
  isLoading: false,
  error: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUserFetch: (state) => {
      state.isLoading = true;
    },
    loginUserSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
    },
    loginUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    logOutUser: (state) => {
      state.user = null;
      state.token = "";
    },
  },
});

export const {
  loginUserFailure,
  loginUserFetch,
  loginUserSuccess,
  logOutUser,
} = userSlice.actions;
export default userSlice.reducer;

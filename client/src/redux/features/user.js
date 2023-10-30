import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
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
      state.user = action.payload;
      state.isLoading = false;
    },
    loginUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const { loginUserFailure, loginUserFetch, loginUserSuccess } =
  userSlice.actions;
export default userSlice.reducer;

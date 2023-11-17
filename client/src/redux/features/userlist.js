import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  allUsers: [],
  isLoading: false,
  error: false,
};
const userListSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getAllUsersFetch: (state) => {
      state.isLoading = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.allUsers = action.payload.users;
      state.isLoading = false;
    },
    getAllUsersFailure: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
    updateUser: (state, action) => {
      state.allUsers = state.allUsers.map((user) => {
        if (user._id === action.payload) {
          return action.payload;
        } else return user;
      });
    },
    deleteuser: (state, action) => {
      state.allUsers = state.allUsers?.filter(
        (user) => user._id !== action.payload
      );
    },
  },
});

export const {
  getAllUsersFetch,
  getAllUsersSuccess,
  getAllUsersFailure,
  setError,
  updateUser,
  deleteuser,
} = userListSlice.actions;
export default userListSlice.reducer;

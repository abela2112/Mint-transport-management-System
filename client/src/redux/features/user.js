import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  token: "",
  noOfNotifications: 0,
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
      state.user = action.payload.data;
      state.token = action.payload.token;
      state.isLoading = false;
      state.noOfNotifications = state.user?.notifications?.filter(
        (notif) => !notif?.seen
      ).length;
    },
    loginUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    logOutUser: (state) => {
      state.user = null;
      state.token = "";
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setNotification: (state, action) => {
      state.user.notifications = action.payload?.data;
      state.noOfNotifications = state.user.notifications.filter(
        (notif) => !notif?.seen
      ).length;
    },
    updateNotification: (state, action) => {
      state.user.notifications = action.payload.notifications;
      state.noOfNotifications = state.user.notifications.filter(
        (notif) => !notif?.seen
      ).length;
    
    },
    deleteNotification: (state, action) => {
      state.user.notifications = state.user?.notifications.filter(
        (notification) => notification?._id !== action.payload
      );
      state.noOfNotifications = state.user.notifications.filter(
        (notif) => !notif?.seen
      ).length;
    },
  },
});

export const {
  loginUserFailure,
  loginUserFetch,
  loginUserSuccess,
  logOutUser,
  setError,
  updateNotification,
  deleteNotification,
  setNotification,
} = userSlice.actions;
export default userSlice.reducer;

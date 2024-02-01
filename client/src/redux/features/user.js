import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  token: "",
  noOfNotifications: 0,
  isLoading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUserSuccess: (state, action) => {
      state.user = action.payload.data;
      state.token = action.payload.token;
      state.noOfNotifications = state.user?.notifications?.filter(
        (notif) => !notif?.seen
      ).length;
    },

    logOutUser: (state) => {
      state.user = null;
      state.token = "";
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
  loginUserSuccess,
  logOutUser,
  setError,
  updateNotification,
  deleteNotification,
  setNotification,
} = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  requests: [],
  isLoading: false,
  error: false,
};
const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    getRequestFetch: (state) => {
      state.isLoading = true;
    },
    getRequestSuccess: (state, action) => {
      state.requests = action.payload;
      // state.unSeenRequest = action.payload.filter(
      //   (request) => request.seen === false
      // );
      // state.noOfrequest = state?.unSeenResponse?.length;
      state.isLoading = false;
    },
    getRequestFailure: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    updateRequest: (state, action) => {
      state.requests = state.requests.map((request) => {
        if (request._id == action.payload._id) {
          return action.payload;
        } else return request;
      });
    },
  },
});

export const {
  getRequestFailure,
  getRequestFetch,
  getRequestSuccess,
  updateRequest,
} = requestSlice.actions;
export default requestSlice.reducer;

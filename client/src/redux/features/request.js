import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  requests: [],
  unSeenRequest: [],
  noOfrequest: 0,
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
      state.requests = action.payload?.data;
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

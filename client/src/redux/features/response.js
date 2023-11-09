import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  response: [],
  unSeenResponse: [],
  noOfresponse: 0,
  isLoading: false,
  error: false,
};
const responseSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    getResponseFetch: (state) => {
      state.isLoading = true;
    },
    getResponseSuccess: (state, action) => {
      state.response = action.payload;
      state.unSeenResponse = action.payload.filter(
        (request) => request.seen === false
      );
      state.noOfresponse = state?.unSeenResponse?.length;
      state.isLoading = false;
    },
    getResponseFailure: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    updateResponse: (state, action) => {},
  },
});

export const {
  getResponseFailure,
  getResponseFetch,
  getResponseSuccess,
  updateResponse,
} = responseSlice.actions;
export default responseSlice.reducer;

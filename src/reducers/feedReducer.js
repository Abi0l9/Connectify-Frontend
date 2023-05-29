import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    getFeeds(state, action) {
      return action.payload;
    },
  },
});

export const { getFeeds } = feedSlice.actions;

export const getStoredFeeds = (feeds) => {
  return (dispatch) => {
    dispatch(getFeeds(feeds));
  };
};

export default feedSlice.reducer;

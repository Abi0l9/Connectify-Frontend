import { createSlice } from "@reduxjs/toolkit";

const selectedFeedSlice = createSlice({
  name: "selectedFeed",
  initialState: {},
  reducers: {
    getSelectedFeed(state, action) {
      return action.payload;
    },
  },
});

export const { getSelectedFeed } = selectedFeedSlice.actions;

export const getOneSelectedFeeds = (feed) => {
  return (dispatch) => {
    dispatch(getSelectedFeed(feed));
  };
};

export default selectedFeedSlice.reducer;

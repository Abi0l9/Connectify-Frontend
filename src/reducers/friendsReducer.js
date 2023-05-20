import { createSlice } from "@reduxjs/toolkit";

const friendsSlice = createSlice({
  name: "friends",
  initialState: {},
  reducers: {
    getFriends(state, action) {
      return action.payload;
    },
  },
});

export const { getFriends } = friendsSlice.actions;

export const getAllFriends = (friends) => {
  return (dispatch) => {
    dispatch(getFriends(friends));
  };
};

export default friendsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const loggedInUserSlice = createSlice({
  name: "currentUser",
  initialState: [],
  reducers: {
    getCurLoggedInUser(state, action) {
      return action.payload;
    },
  },
});

const { getCurLoggedInUser } = loggedInUserSlice.actions;

export const getCurUser = (user) => {
  return async (dispatch) => {
    dispatch(getCurLoggedInUser(user));
  };
};

export default loggedInUserSlice.reducer;

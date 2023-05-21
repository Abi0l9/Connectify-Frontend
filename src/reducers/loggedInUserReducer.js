import { createSlice } from "@reduxjs/toolkit";

const loggedInUserSlice = createSlice({
  name: "currentUser",
  initialState: {},
  reducers: {
    getCurLoggedInUser(_state, action) {
      return action.payload;
    },
    clearCurLoggedInUser(_state, _action) {
      return {};
    },
  },
});

const { getCurLoggedInUser, clearCurLoggedInUser } = loggedInUserSlice.actions;

export const getCurUser = (user) => {
  return async (dispatch) => {
    dispatch(getCurLoggedInUser(user));
  };
};

export const logoutCurUser = () => {
  return async (dispatch) => {
    dispatch(clearCurLoggedInUser());
  };
};

export default loggedInUserSlice.reducer;

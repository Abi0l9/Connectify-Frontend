import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    getAllUsers(state, action) {
      return action.payload;
    },
  },
});

const { getAllUsers } = usersSlice.actions;

export const getUsers = (users) => {
  return async (dispatch) => {
    dispatch(getAllUsers(users));
  };
};

export default usersSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(_state, action) {
      return action.payload;
    },
    clearNotification(_state, _action) {
      return "";
    },
  },
});

export const { clearNotification, setNotification } = notificationSlice.actions;

export const notification = (content, time) => {
  return (dispatch) => {
    dispatch(setNotification(content));

    setTimeout(() => {
      dispatch(clearNotification());
    }, time);
  };
};

export default notificationSlice.reducer;

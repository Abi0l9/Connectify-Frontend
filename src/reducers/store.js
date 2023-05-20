import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./notificationReducer";
import friendsReducer from "./friendsReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    friends: friendsReducer,
  },
});

export default store;

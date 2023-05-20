import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./notificationReducer";
import friendsReducer from "./friendsReducer";
import usersReducer from "./usersReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    friends: friendsReducer,
    users: usersReducer,
  },
});

export default store;

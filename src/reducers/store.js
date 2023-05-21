import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./notificationReducer";
import friendsReducer from "./friendsReducer";
import usersReducer from "./usersReducer";
import loggedInUserReducer from "./loggedInUserReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    friends: friendsReducer,
    users: usersReducer,
    curUser: loggedInUserReducer,
  },
});

export default store;

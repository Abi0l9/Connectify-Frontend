import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./notificationReducer";
import friendsReducer from "./friendsReducer";
import usersReducer from "./usersReducer";
import loggedInUserReducer from "./loggedInUserReducer";
import feedReducer from "./feedReducer";
import selectedFeedReducer from "./selectedFeed";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    friends: friendsReducer,
    users: usersReducer,
    curUser: loggedInUserReducer,
    feed: feedReducer,
    selectedFeed: selectedFeedReducer,
  },
});

export default store;

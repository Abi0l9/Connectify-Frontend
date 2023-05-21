import { Box } from "@mui/material";
import "./App.css";
import Layout from "./components/Layouts";
import { useQuery, useSubscription } from "@apollo/client";
import {
  ACCEPTED_FRIEND_REQUEST,
  CANCELLED_FRIEND_REQUEST,
  DECLINED_FRIEND_REQUEST,
  GET_FRIENDS,
  GET_VERIFIED_USERS,
  MADE_FRIEND_REQUEST,
  USER_UPDATED,
} from "./Queries/userQueries";
import { useState } from "react";
import { useMatch } from "react-router-dom";
import { updateCache } from "./handlers";
import { useDispatch } from "react-redux";
import { getAllFriends } from "./reducers/friendsReducer";
import { getUsers } from "./reducers/usersReducer";

function App() {
  const dispatch = useDispatch();

  const [allUsers, setAllUsers] = useState([]);
  const [friends, setFriends] = useState([]);

  const match = useMatch("/profile/:desired_name");
  const selected = match
    ? allUsers?.find((user) => user.desired_name === match.params.desired_name)
    : null;

  useQuery(GET_VERIFIED_USERS, {
    onCompleted: (data) => {
      setAllUsers(data.getVerifiedUsers);
      dispatch(getUsers(data.getVerifiedUsers));
    },
  });

  useQuery(GET_FRIENDS, {
    onCompleted: ({ getFriends }) => {
      setFriends(getFriends);
      console.log(getFriends);
      dispatch(getAllFriends(getFriends));
    },
  });

  useSubscription(MADE_FRIEND_REQUEST, {
    onData: ({ data, client }) => {
      const updatedUser = data.data.madeFriendRequest;

      updateCache(client.cache, { query: GET_VERIFIED_USERS }, updatedUser);
    },
  });

  useSubscription(ACCEPTED_FRIEND_REQUEST, {
    onData: ({ data, client }) => {
      const updatedUser = data.data.acceptedFriendRequest;
      console.log(updatedUser);

      updateCache(client.cache, { query: GET_VERIFIED_USERS }, updatedUser);
    },
  });

  useSubscription(CANCELLED_FRIEND_REQUEST, {
    onData: ({ data, client }) => {
      const updatedUser = data.data.cancelledFriendRequest;

      updateCache(client.cache, { query: GET_VERIFIED_USERS }, updatedUser);
    },
  });

  useSubscription(DECLINED_FRIEND_REQUEST, {
    onData: ({ data, client }) => {
      const updatedUser = data.data.declinedFriendRequest;

      updateCache(client.cache, { query: GET_VERIFIED_USERS }, updatedUser);
    },
  });

  useSubscription(USER_UPDATED, {
    onData: ({ data, client }) => {
      const updatedUser = data.data.userUpdated;
      console.log(data);

      updateCache(client.cache, { query: GET_VERIFIED_USERS }, updatedUser);
    },
  });

  return (
    <Box>
      <Layout allUsers={allUsers} selected={selected} friends={friends} />
    </Box>
  );
}

export default App;

import { Box } from "@mui/material";
import "./App.css";
import Layout from "./components/Layouts";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import {
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
    },
  });

  useQuery(GET_FRIENDS, {
    onCompleted: ({ getFriends }) => {
      setFriends(getFriends);
      dispatch(getAllFriends(getFriends));
    },
  });

  useSubscription(MADE_FRIEND_REQUEST, {
    onData: (data) => {
      console.log(data);
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

import { Box } from "@mui/material";
import "./App.css";
import Layout from "./components/Layouts";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import {
  ACCEPTED_FRIEND_REQUEST,
  CANCELLED_FRIEND_REQUEST,
  DECLINED_FRIEND_REQUEST,
  GET_FRIENDS,
  GET_VERIFIED_USERS,
  MADE_FRIEND_REQUEST,
  SENT_MSG,
  USER_UPDATED,
} from "./Queries/userQueries";
import { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { updateCache } from "./handlers";
import { useDispatch, useSelector } from "react-redux";
import { getAllFriends } from "./reducers/friendsReducer";
import { getUsers } from "./reducers/usersReducer";
import { getCurUser, logoutCurUser } from "./reducers/loggedInUserReducer";
import { GET_ALL_FEEDS } from "./Queries/feedQueries";
import { getStoredFeeds } from "./reducers/feedReducer";

function App() {
  const client = useApolloClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState();

  const allUsers = useSelector((store) => store.users);

  const match = useMatch("/profile/:name");
  const selected = match
    ? allUsers?.find((user) => user.name === match.params.name)
    : null;

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("userData"));

    if (details) {
      dispatch(getCurUser(details));
      setLoggedInUser(details);
    }
  }, [dispatch]);

  useQuery(GET_VERIFIED_USERS, {
    pollInterval: 3000,
    onCompleted: (data) => {
      dispatch(getUsers(data.getVerifiedUsers));
    },
  });

  useQuery(GET_FRIENDS, {
    onCompleted: ({ getFriends }) => {
      dispatch(getAllFriends(getFriends));
    },
  });

  useQuery(GET_ALL_FEEDS, {
    pollInterval: 3000,
    onCompleted: (data) => {
      dispatch(getStoredFeeds(data.getAllFeeds));
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

      updateCache(client.cache, { query: GET_VERIFIED_USERS }, updatedUser);
    },
  });

  useSubscription(SENT_MSG, {
    onData: ({ data, client }) => {
      const updatedUser = data.data.sentMsg;

      updateCache(client.cache, { query: GET_VERIFIED_USERS }, updatedUser);
    },
  });

  const logout = () => {
    setLoggedInUser(null);
    client.resetStore();
    localStorage.clear();
    dispatch(logoutCurUser());
    navigate("/login");
  };

  return (
    <Box>
      <Layout loggedInUser={loggedInUser} logout={logout} selected={selected} />
    </Box>
  );
}

export default App;

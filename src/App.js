import { Box } from "@mui/material";
import "./App.css";
import Layout from "./components/Layouts";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { GET_VERIFIED_USERS, USER_UPDATED } from "./Queries/userQueries";
import { useState } from "react";
import { useMatch } from "react-router-dom";
import { updateCache } from "./handlers";

function App() {
  const client = useApolloClient();

  const [allUsers, setAllUsers] = useState();

  const match = useMatch("/profile/:desired_name");
  const selected = match
    ? allUsers?.find((user) => user.desired_name === match.params.desired_name)
    : null;

  useQuery(GET_VERIFIED_USERS, {
    onCompleted: (data) => {
      setAllUsers(data.getVerifiedUsers);
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
      <Layout allUsers={allUsers} selected={selected} />
    </Box>
  );
}

export default App;

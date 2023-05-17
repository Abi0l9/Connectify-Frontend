import React, { useState } from "react";
import { Routes, Route, useMatch } from "react-router-dom";
import { Box } from "@mui/material";
import Profile from "../Pages/Profile";
import Feed from "../Pages/Feeds";
import FriendsPage from "../Pages/Friends";
import Messages from "../Pages/Messages";
import SignUp from "../Pages/Signup";
import Login from "../Pages/Login";
import { GET_VERIFIED_USERS } from "../../Queries/userQueries";
import { useQuery } from "@apollo/client";

function AppRoutes({ user, setData }) {
  const [allUsers, setAllUsers] = useState();

  useQuery(GET_VERIFIED_USERS, {
    onCompleted: (data) => {
      setAllUsers(data.getVerifiedUsers);
    },
  });

  const match = useMatch("/profile/:desired_name");
  const selected = match
    ? allUsers?.find((user) => user.desired_name === match.params.desired_name)
    : null;

  return (
    <Box>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile/:id" element={<Profile user={selected} />} />
        <Route path="/feed" element={<Feed user={user} />} />
        <Route path="/" element={<Feed user={user} />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/login"
          element={<Login setData={setData} user={user} />}
        />
      </Routes>
    </Box>
  );
}

export default AppRoutes;

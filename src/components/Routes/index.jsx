import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Profile from "../Pages/Profile";
import Feed from "../Pages/Feeds";
import FriendsPage from "../Pages/Friends";
import Messages from "../Pages/Messages";
import SignUp from "../Pages/Signup";
import Login from "../Pages/Login";

function AppRoutes({ user, setUser }) {
  return (
    <Box>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feed" element={<Feed user={user} />} />
        <Route path="/" element={<Feed user={user} />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
    </Box>
  );
}

export default AppRoutes;

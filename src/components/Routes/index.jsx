import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Profile from "../Pages/Profile";
import Feed from "../Pages/Feeds";
import FriendsPage from "../Pages/Friends";
import Messages from "../Pages/Messages";

function AppRoutes() {
  return (
    <Box>
      <Routes>
        <Route path="" />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/friends" element={<Messages />} />
      </Routes>
    </Box>
  );
}

export default AppRoutes;

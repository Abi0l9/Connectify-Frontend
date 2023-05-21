import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Profile from "../Pages/Profile";
import Feed from "../Pages/Feeds";
import FriendsPage from "../Pages/Friends";
import Messages from "../Pages/Messages";
import SignUp from "../Pages/Signup";
import Login from "../Pages/Login";

function AppRoutes({ selected }) {
  return (
    <Box>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile/:id" element={<Profile user={selected} />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/" element={<Feed />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Box>
  );
}

export default AppRoutes;

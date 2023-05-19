import { Routes, Route, useMatch } from "react-router-dom";
import { Box } from "@mui/material";
import Profile from "../Pages/Profile";
import Feed from "../Pages/Feeds";
import FriendsPage from "../Pages/Friends";
import Messages from "../Pages/Messages";
import SignUp from "../Pages/Signup";
import Login from "../Pages/Login";

function AppRoutes({ user, setData, allUsers, selected }) {
  return (
    <Box>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/profile/:id"
          element={<Profile user={selected} loggedInUser={user} />}
        />
        <Route path="/feed" element={<Feed user={user} />} />
        <Route path="/" element={<Feed user={user} />} />
        <Route
          path="/friends"
          element={<FriendsPage loggedInUser={user} allUsers={allUsers} />}
        />
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

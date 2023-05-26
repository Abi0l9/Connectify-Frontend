import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Profile from "../Pages/Profile";
import Feed from "../Pages/Feeds";
import FriendsPage from "../Pages/Friends";
import Messages from "../Pages/Messages";
import SignUp from "../Pages/Signup";
import Login from "../Pages/Login";
import { useSelector } from "react-redux";

function AppRoutes({ selected }) {
  const loggedInUser = useSelector((state) => state.curUser);

  return (
    <Box>
      <Routes>
        <Route
          path="/profile/:name"
          element={
            !loggedInUser?.userId ? <Login /> : <Profile user={selected} />
          }
        />
        <Route
          path="/feed"
          element={!loggedInUser?.userId ? <Login /> : <Feed />}
        />
        <Route
          path="/"
          element={!loggedInUser?.userId ? <Login /> : <Feed />}
        />
        <Route
          path="/friends"
          element={!loggedInUser?.userId ? <Login /> : <FriendsPage />}
        />
        <Route
          path="/messages"
          element={!loggedInUser?.userId ? <Login /> : <Messages />}
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/login"
          element={!loggedInUser?.userId ? <Login /> : <Feed />}
        />
      </Routes>
    </Box>
  );
}

export default AppRoutes;

import Header from "./Header";
import Footer from "./Footer";
import AppRoutes from "../Routes";
import { Box } from "@mui/material";
import Notification from "../Notification";

function Layout({ selected, logout, loggedInUser }) {
  return (
    <Box sx={{}}>
      <Header logout={logout} loggedInUser={loggedInUser} />
      <Notification />
      <Box sx={{ minHeight: "100vh" }}>
        <AppRoutes selected={selected} />
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;

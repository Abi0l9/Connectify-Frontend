import Header from "./Header";
import Footer from "./Footer";
import AppRoutes from "../Routes";
import { Box } from "@mui/material";
import Notification from "../Notification";
import { useNavigate } from "react-router-dom";

function Layout({ selected, logout }) {
  return (
    <Box>
      <Header logout={logout} />
      <Notification />
      <Box sx={{ minHeight: "100vh" }}>
        <AppRoutes selected={selected} />
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;

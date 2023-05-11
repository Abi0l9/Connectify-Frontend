import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import AppRoutes from "../Routes";
import { Box } from "@mui/material";

function Layout() {
  return (
    <Box>
      <Header />
      <Box sx={{ minHeight: "100vh" }}>
        <AppRoutes />
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;

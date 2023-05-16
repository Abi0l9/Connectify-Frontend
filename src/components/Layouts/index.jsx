import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AppRoutes from "../Routes";
import { Box } from "@mui/material";
import Notification from "../Notification";
import { useNavigate } from "react-router-dom";

function Layout() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("userData"));

    if (details) {
      setUser(details);
    }
  }, [setUser]);

  useEffect(() => {
    if (user) {
      navigate("/feed");
    }
  }, [setUser, user, navigate]);

  return (
    <Box>
      <Header user={user} setUser={setUser} />
      <Notification />
      <Box sx={{ minHeight: "100vh" }}>
        <AppRoutes user={user} setUser={setUser} />
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;

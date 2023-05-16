import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AppRoutes from "../Routes";
import { Box } from "@mui/material";
import Notification from "../Notification";
import { useNavigate } from "react-router-dom";

function Layout() {
  const [data, setData] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("userData"));

    if (details) {
      setData(details);
    }
  }, [setData]);

  useEffect(() => {
    setUser(data);
  }, [setUser, data]);

  const logout = () => {
    localStorage.clear();
    setData(null);
    setUser("");
    navigate("/login");
  };

  return (
    <Box>
      <Header user={user} setData={setData} logout={logout} />
      <Notification />
      <Box sx={{ minHeight: "100vh" }}>
        <AppRoutes user={user} setData={setData} />
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;

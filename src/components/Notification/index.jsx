import { Box } from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { useEffect, useState } from "react";

const Notification = ({ message }) => {
  const hide = {
    display: "none",
  };

  const [style, setStyle] = useState(hide);

  useEffect(() => {
    const show = {
      my: 2,
      padding: "1rem .2rem",
      backgroundColor: "beige",
      textAlign: "center",
      fontSize: "1.1rem",
      fontFamily: "arial",
    };

    if (message) {
      setStyle(show);
    }
  }, [message]);

  const handleNotification = () => {
    setStyle(hide);
  };

  if (!message) {
    return null;
  }

  return (
    <Box sx={style}>
      {message}
      <Box sx={{ float: "right", mr: 1 }} onClick={handleNotification}>
        <Cancel />
      </Box>
    </Box>
  );
};

export default Notification;

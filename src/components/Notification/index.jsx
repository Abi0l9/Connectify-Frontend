import { Box } from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((store) => store.notification);
  const hide = {
    display: "none",
  };

  const [style, setStyle] = useState(hide);

  useEffect(() => {
    const show = {
      my: 2,
      position: "absolute",
      top: "4rem",
      right: 0,
      width: "100%",
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

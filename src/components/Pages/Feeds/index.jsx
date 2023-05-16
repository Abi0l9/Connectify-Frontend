import { Box, Container } from "@mui/material";
import FeedForm from "./FeedForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Feed({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <Container component="main">
      <Box sx={{ width: "100%" }}>
        <FeedForm />
      </Box>
    </Container>
  );
}

export default Feed;

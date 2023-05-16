import { Box, Container } from "@mui/material";
import FeedForm from "./FeedForm";

function Feed({ user }) {
  return (
    <Container component="main">
      <Box sx={{ width: "100%" }}>
        <FeedForm />
      </Box>
    </Container>
  );
}

export default Feed;

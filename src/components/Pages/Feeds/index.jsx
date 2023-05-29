import { Box, Container } from "@mui/material";
import FeedForm from "./FeedForm";
import FeedList from "./FeedList";

function Feed() {
  return (
    <Container component="main">
      <Box sx={{ width: "100%" }}>
        <FeedForm />
      </Box>
      <Box>
        <FeedList />
      </Box>
    </Container>
  );
}

export default Feed;

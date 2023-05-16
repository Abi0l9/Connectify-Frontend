import { Box, Container } from "@mui/material";
import React from "react";
import AllUsers from "./AllUsers";

function FriendsPage() {
  return (
    <Container component="main">
      <Box>
        <AllUsers />
      </Box>;
    </Container>
  );
}

export default FriendsPage;

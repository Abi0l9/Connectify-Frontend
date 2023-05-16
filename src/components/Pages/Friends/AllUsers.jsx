import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_VERIFIED_USERS } from "../../../Queries/userQueries";
import { Box, Container } from "@mui/material";

function AllUsers() {
  const getFriends = useQuery(GET_VERIFIED_USERS, {});

  console.log(getFriends);

  return (
    <Container component="main">
      <Box></Box>
    </Container>
  );
}

export default AllUsers;

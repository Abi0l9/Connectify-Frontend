import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import AllUsers from "./AllUsers";
import { useSelector } from "react-redux";

function FriendsPage({ loggedInUser, allUsers }) {
  const friends = useSelector((store) => store.friends);
  const [filteredUsers, setFilteredUsers] = useState([]);

  console.log(friends);

  useEffect(() => {
    if (loggedInUser && allUsers) {
      const newList = allUsers.filter(
        (user) => user.id !== loggedInUser.userId
      );

      setFilteredUsers(newList);
    }
  }, [loggedInUser, allUsers, setFilteredUsers]);

  return (
    <Container component="main">
      <Box>
        <AllUsers allUsers={filteredUsers} />
      </Box>
      ;
    </Container>
  );
}

export default FriendsPage;

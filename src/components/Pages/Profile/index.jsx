import { Avatar, Box, Container, Divider, Typography } from "@mui/material";
import React from "react";

function Profile({ user }) {
  return (
    <Container component="main">
      <Box>
        <Box
          sx={{
            width: "150px",
            height: "150px",
            bgcolor: "lightgray",
            my: 2,
            mx: "auto",
            border: "3px solid black",
            borderRadius: "100px",
          }}
        >
          <Avatar sx={{ width: "90%", height: "90%", margin: "0.5rem auto" }}>
            O
          </Avatar>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5">Name: {user?.desired_name}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ width: "500px", margin: "10px auto" }}>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>First Name: {user?.split(" ")[0]}</Typography>
            <Typography>Last Name: {user?.split(" ")[1]}</Typography>
          </Box>
          <Typography>Gender: {user?.gender}</Typography>
          <Typography>City: {user?.city}</Typography>
          <Typography>Country: {user?.country}</Typography>
          <Typography>Occupation: {user?.occupation}</Typography>
          <Typography>Hobbies: {user?.hobbies.join(" , ")}</Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Profile;

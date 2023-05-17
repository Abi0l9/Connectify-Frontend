import { EditNote } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import React from "react";
import UpdateProfile from "./UpdateProfile";

function Profile({ user }) {
  console.log(user);
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
          <Avatar
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: deepOrange[500],
              margin: "0 auto",
            }}
          >
            {`${user?.name.split(" ")[0][0]}${user?.name.split(" ")[1][0]}`}
          </Avatar>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ textAlign: "center" }} flexGrow={1}>
            <Typography variant="h5"> {user?.desired_name}</Typography>
          </Box>
          <Box component="span" sx={{ mx: 1 }}>
            <Tooltip title="update info">
              <EditNote />
            </Tooltip>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ width: "500px", margin: "10px auto" }}>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>
              First Name: <b>{user?.name.split(" ")[0]}</b>
            </Typography>
            <Typography>
              Last Name: <b>{user?.name.split(" ")[1]}</b>
            </Typography>
          </Box>
          <Typography>
            Gender: <b>{user?.gender}</b>
          </Typography>
          <Typography>
            City: <b>{user?.city}</b>
          </Typography>
          <Typography>
            Country: <b>{user?.country}</b>
          </Typography>
          <Typography>
            Occupation: <b>{user?.occupation}</b>
          </Typography>
          <Typography>Hobbies: {user?.hobbies?.join(" , ")}</Typography>
        </Box>
      </Box>
      <Box>
        <UpdateProfile />
      </Box>
    </Container>
  );
}

export default Profile;

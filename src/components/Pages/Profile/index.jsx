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
import React, { useEffect, useState } from "react";
import UpdateProfile from "./UpdateProfile";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../Queries/userQueries";
import Loading from "../../../Reusables/Loading";

function Profile({ user, loggedInUser }) {
  const [userToUpdate, setUserToUpdate] = useState({});

  useEffect(() => {
    if (user) {
      setUserToUpdate(user);
    }
  }, [setUserToUpdate, user]);

  const openModal = (main) => {
    setUserToUpdate(main);
  };

  const result = useQuery(GET_USER, {
    variables: { getOneUserId: userToUpdate.id },
  });

  if (result.loading) {
    return <Loading />;
  }

  const userDetails = result?.data?.getOneUser;

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
            {`${userDetails?.name.split(" ")[0][0]}${
              userDetails?.name.split(" ")[1][0]
            }`}
          </Avatar>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ textAlign: "center" }} flexGrow={1}>
            <Typography variant="h5"> {userDetails?.desired_name}</Typography>
          </Box>
          {userDetails?.id === loggedInUser?.userId && (
            <Box
              component="span"
              sx={{ mx: 1 }}
              onClick={() => openModal(userDetails)}
            >
              <Tooltip title="update info">
                <EditNote />
              </Tooltip>
            </Box>
          )}
        </Box>
      </Box>
      <Divider />
      <Box sx={{ width: "500px", margin: "10px auto" }}>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>
              First Name: <b>{userDetails?.name.split(" ")[0]}</b>
            </Typography>
            <Typography>
              Last Name: <b>{userDetails?.name.split(" ")[1]}</b>
            </Typography>
          </Box>
          <Typography>
            Gender: <b>{userDetails?.gender}</b>
          </Typography>
          <Typography>
            City: <b>{userDetails?.city}</b>
          </Typography>
          <Typography>
            Country: <b>{userDetails?.country}</b>
          </Typography>
          <Typography>
            Occupation: <b>{userDetails?.occupation}</b>
          </Typography>
          <Typography>Hobbies: {userDetails?.hobbies?.join(" , ")}</Typography>
        </Box>
      </Box>
      {userDetails && (
        <Box sx={{}}>
          <UpdateProfile user={userDetails} />
        </Box>
      )}
    </Container>
  );
}

export default Profile;

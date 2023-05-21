import { EditNote } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import UpdateProfile from "./UpdateProfile";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER, MAKE_FRIEND_REQUEST } from "../../../Queries/userQueries";
import Loading from "../../../Reusables/Loading";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "../../../reducers/notificationReducer";

function Profile({ user }) {
  const dispatch = useDispatch();
  const curUser = useSelector((state) => state.curUser);

  const [userToUpdate, setUserToUpdate] = useState({});

  const [open, setOpen] = useState(false);
  const [makeRequest, requestResult] = useMutation(MAKE_FRIEND_REQUEST, {
    onCompleted: () => {
      dispatch(notification("Request sent", 3000));
    },
    onError: (e) => {
      dispatch(notification(e.message, 3000));
    },
  });

  useEffect(() => {
    if (user) {
      setUserToUpdate(user);
    }
  }, [setUserToUpdate, user]);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const result = useQuery(GET_USER, {
    variables: { getOneUserId: userToUpdate.id },
  });

  if (result.loading) {
    return <Loading />;
  }

  const userDetails = result?.data?.getOneUser;

  //handler for sending connect requests
  const handleConnect = () => {
    makeRequest({ variables: { friendId: userDetails?.id } });
  };

  if (requestResult.loading) {
    return <Loading />;
  }

  const neededData = [
    "name",
    "gender",
    "city",
    "country",
    "occupation",
    "hobbies",
  ];
  const finalData =
    userDetails &&
    Object.entries(userDetails).filter(([k]) => neededData.includes(k));

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
          {userDetails?.id === curUser?.userId && (
            <Box component="span" sx={{ mx: 1 }} onClick={openModal}>
              <Tooltip title="update info">
                <EditNote />
              </Tooltip>
            </Box>
          )}
        </Box>
        {userDetails?.id !== curUser?.userId && (
          <Box sx={{ width: "100px", margin: "4px auto" }}>
            <Stack spacing={3} direction="row">
              <Button onClick={handleConnect}>Connect</Button>
              <Button>Message</Button>
            </Stack>
          </Box>
        )}
      </Box>
      <Divider />
      <Box sx={{ width: "500px", margin: "10px auto" }}>
        <Box>
          {finalData?.map(([k, v]) => (
            <Box key={k} sx={{ display: "flex" }}>
              <Box sx={{ width: "200px" }}>
                <Typography variant="body2">
                  {k.charAt(0).toUpperCase() + k.substr(1).toLowerCase()}:
                </Typography>
              </Box>
              <Box sx={{ textAlign: "left" }}>
                <Typography fontWeight="bold">{v}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Dialog open={open} onClose={closeModal}>
        {userDetails && (
          <Box sx={{ my: 2 }}>
            <UpdateProfile user={userDetails} closeModal={closeModal} />
          </Box>
        )}
      </Dialog>
    </Container>
  );
}

export default Profile;

import { EditNote, CheckCircle, HourglassTop } from "@mui/icons-material";
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
import { useMutation } from "@apollo/client";
import {
  /*GET_USER,*/ MAKE_FRIEND_REQUEST,
} from "../../../Queries/userQueries";
import Loading from "../../../Reusables/Loading";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "../../../reducers/notificationReducer";
import useConnectList from "../../../hooks/useConnectList";
import AcceptedRequests from "../Friends/AcceptedRequests";
import { useNavigate } from "react-router-dom";

function Profile({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { accepted, requests } = useConnectList(user);
  const curUser = useSelector((state) => state.curUser);
  const [userToUpdate, setUserToUpdate] = useState({});
  const [open, setOpen] = useState(false);
  const allUsers = useSelector((state) => state.users);

  const [tab, setTab] = useState("about");

  const [makeRequest, requestResult] = useMutation(MAKE_FRIEND_REQUEST, {
    onCompleted: () => {
      dispatch(notification("Request sent", 3000));
    },
    onError: (e) => {
      dispatch(notification(e.message, 3000));
    },
  });
  
  const userExistsInConnectList = accepted?.map(user => user.id)?.includes(curUser.userId)
  const userExistsInRequestsList = requests?.map(user => user.id)?.includes(curUser.userId)
  
  
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

  const profileOwner = allUsers.find((user) => user.id === userToUpdate?.id);

  if (!profileOwner) {
    return <Loading />;
  }

  const userDetails = profileOwner;

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

  const handleTabsClick = (tabName) => {
    setTab(tabName);
  };

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
          <Box sx={{ margin: "4px auto" }}>
            <Stack spacing={3} direction="row" alignItems="center" justifyContent="center">
            <Box>
            {
              userExistsInConnectList ? <Button  disabled>Connected <CheckCircle color="success"/></Button> 
              : userExistsInRequestsList ? <Button  disabled>Pending <HourglassTop color="warning"/></Button>
              : <Button color="success" onClick={handleConnect}>Connect</Button>
            }
            </Box>
                
            <Box>
            <Button onClick={() => navigate("/messages")}>Message</Button>
            </Box>
                
              
            </Stack>
          </Box>
        )}
      </Box>
      <Divider />
      <Box sx={{ fontWeight: "bold", mx: "auto", my: 1 }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Box onClick={(e) => handleTabsClick("about")}>
            <Button size="small">About</Button>
          </Box>
          <Box onClick={(e) => handleTabsClick("friends")}>
            <Button size="small">Friends</Button>
          </Box>
        </Stack>
      </Box>
      <Divider />
      {tab === "about" && (
        <Box sx={{ margin: "10px auto" }}>
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
      )}
      {tab === "friends" && (
        <Box>
          <AcceptedRequests accepted={accepted} />
        </Box>
      )}
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

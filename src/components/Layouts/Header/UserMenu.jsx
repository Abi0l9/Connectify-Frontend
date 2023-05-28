import {
  ArrowDropDown,
  CloseRounded,
  DeleteSweepRounded,
  Inbox,
  Logout,
  MessageOutlined,
  MessageRounded,
  Notifications,
  Person,
  Person2Rounded,
  Settings,
  VerifiedUserSharp,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  MenuItem,
  Typography,
  Menu,
  Badge,
  Link,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {
  CLEAR_NOTIFICATIONS,
  GET_USER,
  GET_VERIFIED_USERS,
} from "../../../Queries/userQueries";
import { useSelector } from "react-redux";
import { updateCache } from "../../../handlers";

const NotificationModal = ({ notifications, toggleModal, modalState }) => {
  const contents = notifications?.content.slice(-5).reverse();
  const [clear] = useMutation(CLEAR_NOTIFICATIONS, {
    onError: (error) => {
      console.log(error);
    },
    update: (cache, response) => {
      updateCache(
        cache,
        { query: GET_VERIFIED_USERS },
        response.data.clearNotifications
      );
    },
  });
  
  const clearNotifs = () => {
      clear()
      toggleModal()
  }

  return (
    <Box>
      <Dialog open={modalState} onClose={toggleModal}>
        <DialogTitle>Latest Notifications</DialogTitle>
        <DialogContent>
          {contents?.map((content, idx) => (
            <List key={idx}>
              <ListItem>
                <ListItemAvatar>
                  {content.contentType === "friend" && <Person2Rounded />}
                  {content.contentType === "message" && <MessageOutlined />}
                </ListItemAvatar>
                <Link
                  sx={{ cursor: "pointer" }}
                  href={
                    content.contentType === "friend" ? "/friends" : "/messages"
                  }
                  underline="none"
                >
                  <ListItemText primary={content.message} />
                </Link>
              </ListItem>
            </List>
          ))}
          {!contents?.length && "You have no notifications"}
        </DialogContent>
        <Box sx={{ m: 1 }}>
          <Stack direction="row" justifyContent="space-between">
            <CloseRounded onClick={toggleModal} />
            <DeleteSweepRounded onClick={clearNotifs} />
          </Stack>
        </Box>
      </Dialog>
    </Box>
  );
};

const UserMenu = ({ logout }) => {
  const [open, setOpen] = useState(false);
  const loggedInUser = useSelector((state) => state.curUser);
  const navigate = useNavigate();
  const [modalState, setModalState] = useState(false);

  const toggleModal = () => {
    setModalState(!modalState);
  };

  const result = useQuery(GET_USER, {
    variables: { getOneUserId: loggedInUser.userId },
  });

  const userDetails = result?.data?.getOneUser;

  if (result.loading) {
    return null;
  }

  const style = { display: open ? "" : "none" };
  const openMenu = (e) => {
    setOpen(!open);
  };

  const menuItems = [
    {
      name: "Profile",
      avatar: <Person />,
      action: () => navigate(`/profile/${userDetails?.name}`),
    },
    {
      name: "Friends",
      avatar: <VerifiedUserSharp />,
      action: () => navigate("/friends"),
    },
    { name: "Inbox", avatar: <Inbox />, action: () => navigate("/messages") },
    { name: "Account", avatar: <Settings />, action: () => null },
    { name: "Logout", avatar: <Logout />, action: logout },
  ];

  return (
    <Box sx={{ display: "flex", mx: 1, alignItems: "center" }}>
      <Box>
        <NotificationModal
          modalState={modalState}
          toggleModal={toggleModal}
          notifications={userDetails?.notification}
        />
      </Box>
      <Box
        sx={{
          mx: 1,
          display: {
            xs: "none",
            sm: "block",
          },
        }}
      >
        <Stack alignItems="center">
          <Avatar sx={{ bgcolor: deepOrange[500], width: 24, height: 24 }}>
            {userDetails?.name?.split(" ")[0][0]}
          </Avatar>
          <Typography variant="body1" fontWeight="bold">
            <Link
              color="inherit"
              underline="none"
              href={`/profile/${userDetails?.name}`}
            >
              {userDetails?.name}
            </Link>
          </Typography>
        </Stack>
      </Box>
      <Stack direction="row" spacing={2}>
        <Badge
          color="secondary"
          badgeContent={userDetails?.notification.count}
          max={99}
        >
          <Notifications color="white" onClick={toggleModal} />
        </Badge>
        <MessageRounded onClick={() => navigate("/messages")} />
      </Stack>

      <Box sx={style}>
        <Menu
          open={open}
          onClose={openMenu}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ mt: 4 }}
        >
          {menuItems.map((m) => (
            <MenuItem
              key={m.name}
              onClick={openMenu}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box onClick={m.action}>
                {m.avatar}
                <Box
                  component="span"
                  sx={{
                    ml: 1.5,
                  }}
                >
                  {m.name}
                </Box>
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <ArrowDropDown onClick={openMenu} />
    </Box>
  );
};

export default UserMenu;

import {
  Avatar,
  Box,
  Button,
  Container,
  List,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import useConnectList from "../../../hooks/useConnectList";
import { deepOrange } from "@mui/material/colors";
import Inbox from "./Inbox";
import { useSelector } from "react-redux";
import Chats from "./Chats";

function Messages() {
  const { accepted } = useConnectList();
  const [tab, setTab] = useState("chats");
  const [receiver, setReceiver] = useState("");

  const curUser = useSelector((store) => store.curUser);
  const allUsers = useSelector((state) => state.users);

  const senderProfile = allUsers.find((user) => user.id === curUser.userId);
  const convo = senderProfile.messages.find(
    (msg) =>
      (msg.sender.id === curUser.userId && msg.receiver.id === receiver) ||
      (msg.sender.id === receiver && msg.receiver.id === curUser.userId)
  );

  const myInbox = convo?.inbox;

  const myChats = senderProfile.messages.map((ibx) => ibx?.receiver);

  const handleTab = (tabName) => {
    setTab(tabName);
  };

  const getSenderId = (tabName, id) => {
    setReceiver(id);
    handleTab(tabName);
  };

  return (
    <Box>
      <Box>
        <Stack
          direction={"row"}
          spacing={4}
          sx={{ justifyContent: "center", cursor: "pointer" }}
        >
          <Typography variant="h5" onClick={() => handleTab("chats")}>
            <Button>Chats</Button>
          </Typography>
          <Typography variant="h5" onClick={() => handleTab("connects")}>
            <Button>Connects</Button>
          </Typography>
        </Stack>
      </Box>
      <Box id="connects">
        {tab === "connects" &&
          accepted?.map((user) => (
            <List sx={{ width: "100%" }} key={user.id}>
              <ListItem
                secondaryAction={
                  <Box>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => getSenderId("inbox", user.id)}
                    >
                      chat
                    </Button>
                  </Box>
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: deepOrange[500] }}></Avatar>
                </ListItemAvatar>
                <Link href={`/profile/${user.name}`} underline="none">
                  <ListItemText primary={user.name} />
                </Link>
              </ListItem>
            </List>
          ))}
      </Box>
      <Box id="chats">
        {tab === "chats" && (
          <Box>
            <Chats receivers={myChats} getSenderId={getSenderId} />
          </Box>
        )}
      </Box>
      <Box>
        {tab === "inbox" && <Inbox receiver={receiver} myInbox={myInbox} />}
      </Box>
    </Box>
  );
}

export default Messages;
// {myChats?.map((receiver) => receiver.name)}

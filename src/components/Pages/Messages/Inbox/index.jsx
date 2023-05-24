import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_MSG } from "../../../../Queries/userQueries";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";

const SenderBox = styled(Box)({
  color: "skyblue",
  fontFamily: "cursive",
  backgroundColor: "whitesmoke",
  width: "40%",
  padding: ".8rem .4rem",
  margin: ".2rem",
  position: "relative",
  right: 0,
  left: "60%",
  borderRadius: ".8rem 0 .8rem 0",
});

const ReceiverBox = styled(Box)({
  color: "white",
  fontFamily: "cursive",
  backgroundColor: "purple",
  width: "40%",
  padding: ".8rem .4rem",
  margin: ".2rem",
  position: "relative",
  left: 0,
  right: "60%",
  borderRadius: "0 .8rem 0 .8rem",
});

const Inbox = ({ receiver }) => {
  const [content, setContent] = useState();
  const curUser = useSelector((store) => store.curUser);
  const allUsers = useSelector((state) => state.users);

  const senderProfile = allUsers.find((user) => user.id === curUser.userId);
  const convo = senderProfile.messages.find(
    (msg) =>
      (msg.sender.id === curUser.userId && msg.receiver.id === receiver) ||
      (msg.sender.id === receiver && msg.receiver.id === curUser.userId)
  );

  const myInbox = convo?.inbox;

  const [sendMsg] = useMutation(SEND_MSG, {
    variables: { receiver, content },
    onCompleted: (data) => {
      console.log(data);
      setContent("");
    },
    onError: (e) => {
      console.log(e.message);
    },
  });

  const handleSendMsg = (e) => {
    e.preventDefault();
    sendMsg();
    setContent("");
    console.log("sending messages...");
  };

  return (
    <Box>
      <Box sx={{ height: "80vh" }}>
        <Box sx={{ height: "70vh", overflowY: "scroll", overflowX: "hidden" }}>
          {myInbox?.map(({ id, sender, content, time }) => (
            <Box>
              {sender.id === curUser.userId ? (
                <SenderBox key={id}>{content}</SenderBox>
              ) : (
                <ReceiverBox key={id}>{content}</ReceiverBox>
              )}
            </Box>
          )) || "Start a conversation with..."}
        </Box>
        <Box>
          <form
            onSubmit={handleSendMsg}
            style={{
              margin: "0 auto",
              bottom: 0,
              left: 0,
              right: 0,
              position: "absolute",
              width: "100%",
            }}
          >
            <TextField
              placeholder="type your message here..."
              value={content}
              multiline
              maxRows={3}
              fullWidth
              onChange={({ target }) => setContent(target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button type="submit">
                      <ArrowForwardIosRounded />
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Inbox;

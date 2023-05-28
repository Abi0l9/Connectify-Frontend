import {
  Box,
  Button,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_USER,
  GET_VERIFIED_USERS,
  SEND_MSG,
} from "../../../../Queries/userQueries";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { updateCache } from "../../../../handlers";
import { notification } from "../../../../reducers/notificationReducer";

const SenderBox = styled(Box)({
  color: "whitesmoke",
  fontFamily: "sans-serif",
  backgroundColor: "darkblue",
  width: "60%",
  padding: ".4rem",
  margin: ".3rem",
  position: "relative",
  fontWeight: "bold",
  right: 0,
  left: "40%",
  borderRadius: ".8rem 0 .8rem 0",
});

const TimeHolder = styled(Box)({
  color: "lightgrey",
  fontFamily: "arial",
  fontSize: ".6rem",
  padding: ".2rem",
  paddingLeft: "-0.1rem",
  margin: "-0.2rem",
  marginBottom: ".2rem",
  position: "relative",
  top: 0,
  width: "100%",
});

const ReceiverBox = styled(Box)({
  color: "white",
  fontFamily: "sans-serif",
  fontWeight: "bold",
  backgroundColor: "purple",
  width: "60%",
  padding: ".4rem",
  margin: ".3rem",
  position: "relative",
  left: 0,
  right: "40%",
  borderRadius: "0 .8rem 0 .8rem",
});

const Inbox = ({ receiver, myInbox }) => {
  const [content, setContent] = useState();
  const dispatch = useDispatch();
  const curUser = useSelector((store) => store.curUser);

  const [sendMsg] = useMutation(SEND_MSG, {
    variables: { receiver, content },
    onCompleted: (data) => {
      setContent("");
    },
    onError: (e) => {
      console.log(e.message);
      dispatch(notification("an error occured...", 3000));
    },
    update: (cache, response) => {
      updateCache(cache, { query: GET_VERIFIED_USERS }, response.data.sendMsg);
    },
  });

  const handleSendMsg = (e) => {
    e.preventDefault();
    sendMsg();
    setContent("");
    console.log("sending messages...");
  };

  const timeSplitter = (time) => {
    if (time) {
      const convertedTime = time.toLocaleString();
      const newTime = convertedTime.split(" ")[4];
      const date = convertedTime.split(" ").slice(0, 4).join(" ");
      return `${newTime} - ${date}`;
    }
  };

  const getUser = useQuery(GET_USER, {
    variables: { getOneUserId: receiver },
  });

  const receiverInfo = getUser?.data?.getOneUser;

  return (
    <Box sx={{ maxWidth: "xs", maxHeight: "1800px" }}>
      <Box sx={{ height: "75vh" }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6">
            Chatting with{" "}
            {(
              <Link
                color="green"
                underline="hover"
                href={`/profile/${receiverInfo?.name}`}
              >
                {receiverInfo?.name}
              </Link>
            ) || "User"}
          </Typography>
        </Box>
        <Box
          sx={{
            height: "75vh",
            overflowY: "scroll",
            overflowX: "hidden",
            width: "100%",
          }}
        >
          {myInbox?.map(({ id, sender, content, time }) => (
            <Box key={id}>
              {sender.id === curUser.userId ? (
                <SenderBox key={id}>
                  <TimeHolder>{timeSplitter(time)}</TimeHolder>
                  {content}
                </SenderBox>
              ) : (
                <ReceiverBox key={id}>
                  <TimeHolder>{timeSplitter(time)}</TimeHolder>
                  {content}
                </ReceiverBox>
              )}
            </Box>
          )) || `Start a conversation with ${receiverInfo?.name}`}
        </Box>
        <Box>
          <form
            onSubmit={handleSendMsg}
            style={{
              margin: ".2rem auto",
              bottom: 20,
              left: 0,
              right: 0,
              position: "static",
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
                      <Send color="success"/>
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

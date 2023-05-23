import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_MSG } from "../../../../Queries/userQueries";

const Inbox = ({ receiver }) => {
  const [content, setContent] = useState();
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
    console.log(receiver, content);
    // sendMsg();
  };

  return (
    <Box>
      <Box sx={{ height: "80vh" }}>
        <Box
          onSubmit={(e) => handleSendMsg(e)}
          component="form"
          sx={{
            margin: "0 auto",
            bottom: 0,
            left: 0,
            right: 0,
            position: "absolute",
            width: "80%",
          }}
        >
          <TextField
            placeholder="type your message here..."
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
        </Box>
      </Box>
    </Box>
  );
};

export default Inbox;

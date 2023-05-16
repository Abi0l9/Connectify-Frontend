import { useState } from "react";
import { useDispatch } from "react-redux";
import { notification } from "../../../reducers/notificationReducer";
import { Avatar, Box, Button, TextField } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useMutation } from "@apollo/client";
import { CREATE_FEED } from "../../../Queries/userQueries";
import Loading from "../../../Reusables/Loading";

function FeedForm() {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [media, setMedia] = useState("");

  const [createFeed, result] = useMutation(CREATE_FEED, {
    variables: { content },

    onError: (e) => {
      dispatch(notification(e.message, 2000));
    },

    onCompleted: (data) => {
      console.log(data);

      setContent("");
      setMedia("");
    },
  });

  const handleCreateFeed = (e) => {
    e.preventDefault();

    createFeed();
  };

  return (
    <Box>
      {result.loading && <Loading />}
      <Box
        component="form"
        onSubmit={(e) => handleCreateFeed(e)}
        sx={{
          display: "flex",
          py: 1,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100px",
          }}
        >
          <Avatar sx={{ bgcolor: deepOrange[500], mx: 1 }}>DP</Avatar>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            multiline
            minRows={3}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxRows={3}
            placeholder="Share your ideas/feelings..."
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column-reverse",
            height: "100px",
            ml: 1,
          }}
        >
          <Button
            variant="contained"
            type="submit"
            color="success"
            size="small"
          >
            share
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default FeedForm;

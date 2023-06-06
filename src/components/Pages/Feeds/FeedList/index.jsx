import { Box, Typography, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { timeSplitter } from "../../../../utils";

function FeedList() {
  const feeds = useSelector((state) => state.feed);

  console.log(feeds);

  return (
    <Box>
      <Box>
        {[...feeds]
          .sort((a, b) => a.time > b.time)
          .map((feed) => (
            <Box key={feed.id} sx={{ border: 1, p: 1 }}>
              <Stack>
                <Typography fontWeight="bold">
                  {feed?.poster?.name || "Unknown"}
                </Typography>
                <Typography>{feed?.content}</Typography>
                <Stack flexDirection="row" spacing={2}>
                  <Typography color="GrayText" fontSize=".6rem">
                    {timeSplitter(feed?.time)}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default FeedList;

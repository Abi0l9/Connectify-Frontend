import { Box, Typography, Stack, Badge } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { timeSplitter } from "../../../../utils";
import { CommentRounded, Favorite } from "@mui/icons-material";

function FeedList() {
  const feeds = useSelector((state) => state.feed);

  console.log(feeds);

  return (
    <Box>
      <Box>
        {[...feeds]
          .sort((a, b) => b.time - a.time)
          .map((feed) => (
            <Box key={feed.id} sx={{ border: 1, p: 1 }}>
              <Stack>
                <Typography fontWeight="bold">
                  {feed?.poster?.name || "Unknown"}
                </Typography>
                <Typography>{feed?.content}</Typography>
                <Stack
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ flex: 1 }}
                >
                  <Typography color="GrayText" fontSize=".6rem">
                    {timeSplitter(feed?.time)}
                  </Typography>
                  <Stack
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ width: "50px" }}
                  >
                    <Box>
                      <Badge badgeContent={0} color="success">
                        <Favorite color="error" />
                      </Badge>
                    </Box>
                    <Box>
                      <Badge badgeContent={0} color="success">
                        <CommentRounded color="white" />
                      </Badge>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default FeedList;

import { Box, Typography, Stack, Badge } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { timeSplitter } from "../../../../utils";
import { CommentRounded, Favorite } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { LIKE_FEED } from "../../../../Queries/feedQueries";

function FeedList() {
  const feeds = useSelector((state) => state.feed);
  const [likeFeed] = useMutation(LIKE_FEED, {
    onCompleted(data) {
      console.log(data);
    },
  });

  const handleLike = (feedId) => {
    likeFeed({ variables: { feedId } });
  };

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
                    sx={{ width: "70px" }}
                  >
                    <Box>
                      <Badge
                        onClick={() => handleLike(feed.id)}
                        badgeContent={feed?.likes}
                        color="success"
                      >
                        <Favorite
                          color="error"
                          sx={{
                            cursor: "pointer",
                            ":active": {
                              color: "rebeccapurple",
                            },
                          }}
                        />
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

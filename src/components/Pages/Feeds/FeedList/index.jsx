import { Box, Typography, Link as MLink, Stack, Badge } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { timeSplitter } from "../../../../utils";
import { CommentRounded, Favorite } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { LIKE_FEED } from "../../../../Queries/feedQueries";
import { Link } from "react-router-dom";
import { getOneSelectedFeeds } from "../../../../reducers/selectedFeed";

function FeedList() {
  const dispatch = useDispatch();
  const feeds = useSelector((state) => state.feed);
  const [likeFeed] = useMutation(LIKE_FEED);

  const handleLike = (feedId) => {
    likeFeed({ variables: { feedId } });
  };

  const handleFeedComment = (feed) => {
    dispatch(getOneSelectedFeeds(feed));
  };

  return (
    <Box>
      <Box>
        {[...feeds]?.reverse().map((feed) => (
          <Box key={feed.id} sx={{ border: 1, p: 1 }}>
            <Stack>
              <Typography fontWeight="bold">
                <MLink
                  href={feed?.poster?.name && `/profile/${feed?.poster?.name}`}
                  underline="none"
                >
                  {feed?.poster?.name || "Unknown"}
                </MLink>
              </Typography>
              <Typography>
                <Link
                  to={`/feeds/${feed?.id}`}
                  state={feed}
                  style={{
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  {feed?.content?.length >= 120
                    ? feed?.content?.slice(0, 120) + "..."
                    : feed?.content}
                </Link>
              </Typography>
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
                    <Badge
                      onClick={() => handleFeedComment(feed)}
                      badgeContent={0}
                      color="success"
                    >
                      <Link to={`/feeds/${feed?.id}`} state={feed}>
                        <CommentRounded color="white" />
                      </Link>
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

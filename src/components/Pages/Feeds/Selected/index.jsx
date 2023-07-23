import { Badge, Box, Link, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../../../../Reusables/Loading";
import { timeSplitter } from "../../../../utils";
import { Favorite } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { LIKE_FEED } from "../../../../Queries/feedQueries";

export const Divider = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "2px",
        backgroundColor: "lightGray",
      }}
    ></Box>
  );
};

const Selected = () => {
  const location = useLocation();
  const [feed, setFeed] = useState({});
  const [likes, setLikes] = useState(0);

  const [likeFeed] = useMutation(LIKE_FEED, {
    onCompleted(data) {
      setLikes(data.likeFeed.likes);
    },
  });

  const handleLike = (feedId) => {
    likeFeed({ variables: { feedId } });
  };

  useEffect(() => {
    if (location.state) {
      setFeed(location.state);
      setLikes(location.state.likes);
    }
  }, [location.state]);

  if (!feed) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        mt: 2,
        mb: 1,
        px: 2,
        mx: "auto",
        maxWidth: "sm",
      }}
    >
      <Box>
        <Typography
          fontSize="1rem"
          fontWeight="500"
          color="blue"
          sx={{ cursor: "pointer" }}
        >
          <Link
            href={feed?.poster?.name && `/profile/${feed?.poster?.name}`}
            underline="hover"
          >
            {feed?.poster?.name || "Unknown"}
          </Link>
        </Typography>
        <Typography component="p" sx={{ mb: ".7rem" }}>
          {feed?.content}
        </Typography>
        <Divider />
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack flexDirection="row" alignItems="center">
            <Typography sx={{ fontSize: ".8rem", mr: "1rem" }}>
              {likes} likes
            </Typography>
            <Typography sx={{ fontSize: ".8rem" }}>
              posted at {timeSplitter(feed?.time)?.slice(0, 5)}{" "}
            </Typography>
          </Stack>
          <Box>
            <Badge onClick={() => handleLike(feed?.id)}>
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
        </Stack>
        <Divider />
      </Box>
    </Box>
  );
};

export default Selected;

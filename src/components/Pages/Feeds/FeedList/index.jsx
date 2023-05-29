import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function FeedList() {
  const feeds = useSelector((state) => state.feed);

  console.log(feeds);

  return (
    <Box>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </Box>
  );
}

export default FeedList;

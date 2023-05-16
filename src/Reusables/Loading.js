import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box>
      <CircularProgress
        sx={{
          bgcolor: "transparent",
          opacity: 0.8,
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          height: "100%",
          zIndex: 1000,
          textAlign: "center",
        }}
      />
    </Box>
  );
};

export default Loading;

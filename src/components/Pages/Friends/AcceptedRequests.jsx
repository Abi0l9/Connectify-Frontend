import { Box, Typography } from "@mui/material";
import ListTemplate from "./ListTempate";

const AcceptedRequests = ({ accepted }) => {
  return (
    <Box sx={{ maxWidth: "400px", mx: 1 }}>
        {!accepted?.length > 0 && <Typography>Your connects will appear here...</Typography>}
      <ListTemplate list={accepted} type="accepted" />
    </Box>
  );
};

export default AcceptedRequests;

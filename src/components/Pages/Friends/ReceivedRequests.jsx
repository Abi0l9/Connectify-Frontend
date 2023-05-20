import { Box, Typography } from "@mui/material";
import ListTemplate from "./ListTempate";

const ReceivedRequests = ({ requests }) => {
  return (
    <Box sx={{ maxWidth: "350px" }}>
      <Typography>Connection Requests</Typography>
      <ListTemplate list={requests} type="requests" />
    </Box>
  );
};

export default ReceivedRequests;

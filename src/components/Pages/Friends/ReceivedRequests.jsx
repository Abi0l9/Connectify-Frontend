import { Box, Typography } from "@mui/material";
import ListTemplate from "./ListTempate";

const ReceivedRequests = ({ requests }) => {
  return (
    <Box sx={{ maxWidth: "400px", mx: 1 }}>
    {!requests.length > 0 && <Typography>No one has sent you any requests...</Typography>}
      <ListTemplate list={requests} type="requests" />
    </Box>
  );
};

export default ReceivedRequests;

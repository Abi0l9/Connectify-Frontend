import { Box } from "@mui/material";
import ListTemplate from "./ListTempate";

const ReceivedRequests = ({ requests }) => {
  return (
    <Box sx={{ maxWidth: "400px", mx: 1 }}>
      <ListTemplate list={requests} type="requests" />
    </Box>
  );
};

export default ReceivedRequests;

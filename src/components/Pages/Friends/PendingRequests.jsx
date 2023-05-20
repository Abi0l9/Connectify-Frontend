import { Box, Typography } from "@mui/material";
import ListTemplate from "./ListTempate";

const PendingRequests = ({ pendings }) => {
  return (
    <Box sx={{ maxWidth: "350px" }}>
      <Typography>Pendings Requests</Typography>
      <ListTemplate list={pendings} type="pendings" />
    </Box>
  );
};

export default PendingRequests;

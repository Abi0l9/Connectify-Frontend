import { Box, Typography } from "@mui/material";
import ListTemplate from "./ListTempate";

const PendingRequests = ({ pendings }) => {
  return (
    <Box sx={{ maxWidth: "400px", mx: 1 }}>
      <ListTemplate list={pendings} type="pendings" />
    </Box>
  );
};

export default PendingRequests;

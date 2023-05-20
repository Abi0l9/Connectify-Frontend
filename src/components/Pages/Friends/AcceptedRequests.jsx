import { Box, Typography } from "@mui/material";
import ListTemplate from "./ListTempate";

const AcceptedRequests = ({ accepted }) => {
  return (
    <Box sx={{ maxWidth: "350px" }}>
      <Typography>Friends List</Typography>
      <ListTemplate list={accepted} type="accepted" />
    </Box>
  );
};

export default AcceptedRequests;

import { Box, Typography } from "@mui/material";
import ListTemplate from "./ListTempate";
import AccordionWrapper from "./AccordionWrapper";

const ReceivedRequests = ({ requests }) => {
  return (
    <Box sx={{ maxWidth: "400px" }}>
      <AccordionWrapper
        title={<Typography>Connection Requests</Typography>}
        list={<ListTemplate list={requests} type="requests" />}
      />
    </Box>
  );
};

export default ReceivedRequests;

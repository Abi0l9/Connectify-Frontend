import { Box, Typography } from "@mui/material";
import ListTemplate from "./ListTempate";
import AccordionWrapper from "./AccordionWrapper";

const AcceptedRequests = ({ accepted }) => {
  return (
    <Box sx={{ maxWidth: "400px", mx: 1 }}>
      <ListTemplate list={accepted} type="accepted" />
    </Box>
  );
};

export default AcceptedRequests;

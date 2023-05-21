import { Box, Typography } from "@mui/material";
import ListTemplate from "./ListTempate";
import AccordionWrapper from "./AccordionWrapper";

const AcceptedRequests = ({ accepted }) => {
  return (
    <Box sx={{ maxWidth: "400px" }}>
      <AccordionWrapper
        title={<Typography>Friends List</Typography>}
        list={<ListTemplate list={accepted} type="accepted" />}
      />
    </Box>
  );
};

export default AcceptedRequests;

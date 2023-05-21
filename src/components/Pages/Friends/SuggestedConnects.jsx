import { Box, Typography } from "@mui/material";
import ListTemplate from "./ListTempate";

const SuggestedConnects = ({ suggestions }) => {
  return (
    <Box sx={{ maxWidth: "350px" }}>
      <Typography>You can connect with these people</Typography>
      <ListTemplate list={suggestions} type="suggestions" />
    </Box>
  );
};

export default SuggestedConnects;

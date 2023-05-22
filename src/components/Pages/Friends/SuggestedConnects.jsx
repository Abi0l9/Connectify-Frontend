import { Box, Typography } from "@mui/material";
import ListTemplate from "./ListTempate";

const SuggestedConnects = ({ suggestions }) => {
  return (
    <Box sx={{ maxWidth: "350px" }}>
      {suggestions.length ? (
        <Box>
          <Typography>You can connect with these people</Typography>
          <ListTemplate list={suggestions} type="suggestions" />
        </Box>
      ) : (
        <Typography>No one, here, at the moment...</Typography>
      )}
    </Box>
  );
};

export default SuggestedConnects;

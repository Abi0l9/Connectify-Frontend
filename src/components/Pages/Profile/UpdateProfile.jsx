import { Box, Button, Container, TextField } from "@mui/material";

const UpdateProfile = () => {
  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <TextField
            label="Full Name"
            variant="standard"
            fullWidth
            margin="normal"
          />
        </Box>
        <Box>
          <TextField
            label="Desired Name"
            variant="standard"
            fullWidth
            margin="normal"
          />
        </Box>
        <Box>
          <TextField
            label="City"
            variant="standard"
            fullWidth
            margin="normal"
          />
        </Box>
        <Box>
          <TextField
            label="Country"
            variant="standard"
            fullWidth
            margin="normal"
          />
        </Box>
        <Box>
          <Button
            type="submit"
            size="small"
            variant="contained"
            color="success"
          >
            Update
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UpdateProfile;

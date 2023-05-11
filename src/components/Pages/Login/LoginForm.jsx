import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography>Login into your account</Typography>
        <Box component="form" sx={{ mt: 0.5 }}>
          <TextField
            label="Email"
            fullWidth
            required
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            variant="standard"
            margin="normal"
          />
          <TextField
            label="Password"
            fullWidth
            required
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            variant="standard"
            margin="normal"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remeber me"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginForm;

import {
  Box,
  Button,
  TextField,
  Checkbox,
  Typography,
  Avatar,
  Link,
  FormControl,
  FormControlLabel,
  Select,
  MenuItem,
  Container,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography>Sign Up Here</Typography>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            label="Full Name"
            fullWidth
            required
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            autoCapitalize
            variant="standard"
          />
          <TextField
            label="email"
            fullWidth
            required
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            autoCapitalize
            variant="standard"
          />
          <TextField
            label="phone"
            fullWidth
            required
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoFocus
            variant="standard"
          />
          <TextField
            label="password"
            fullWidth
            variant="standard"
            required
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            autoCapitalize
          />
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              id="gender"
              label="gender"
              variant="standard"
              value={gender}
              onChange={({ target }) => setGender(target.value)}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="agreed" color="primary" required />}
            label="Agreed to terms and conditions"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUpForm;

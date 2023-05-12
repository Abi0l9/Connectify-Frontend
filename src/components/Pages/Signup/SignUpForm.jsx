import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  TextField,
  Checkbox,
  Typography,
  FormControl,
  FormControlLabel,
  Select,
  MenuItem,
  Container,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import { CREATE_USER } from "../../../Queries/userQueries";
import { useDispatch } from "react-redux";
import { notification } from "../../../reducers/notificationReducer";

function SignUpForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");

  const [signup, result] = useMutation(CREATE_USER, {
    variables: { name, email, phone, password, gender },
    onError: (error) => {
      dispatch(notification(error.message, 5000));
    },
    onCompleted: (_data) => {
      dispatch(notification("Registration successful", 5000));
    },
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      signup();
      console.log(result);
      const userToVerify = {
        email,
      };
    } catch (e) {
      console.log(e.message);
    }

    setName("");
    setPassword("");
    setPhone("");
    setConfirmPassword("");
    setGender("");
    setEmail("");
  };

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
        <Box component="form" sx={{ mt: 2 }} onSubmit={(e) => handleSignup(e)}>
          <TextField
            label="Full Name"
            fullWidth
            required
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            autoCapitalize="true"
            variant="standard"
            margin="normal"
          />
          <TextField
            label="Email"
            fullWidth
            required
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            autoCapitalize="true"
            variant="standard"
            margin="normal"
          />
          <TextField
            label="Phone"
            fullWidth
            margin="normal"
            required
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoFocus
            variant="standard"
          />
          <TextField
            label="Password"
            fullWidth
            variant="standard"
            required
            margin="normal"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            autoCapitalize="true"
          />
          <TextField
            label="Confirm Password"
            fullWidth
            variant="standard"
            margin="normal"
            type="password"
            required
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoFocus
            autoCapitalize="true"
            error={password !== confirmPassword}
            helperText={
              password !== confirmPassword ? "password does not match." : ""
            }
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
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

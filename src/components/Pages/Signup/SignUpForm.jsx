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
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { CREATE_USER } from "../../../Queries/userQueries";
import { useDispatch } from "react-redux";
import { notification } from "../../../reducers/notificationReducer";
import VerificationPage from "./Verification";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function SignUpForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const [hideComp, setHideComp] = useState(true);
  const [showSignUp, setShowSignUp] = useState(true);

  const [showPwd, setShowPwd] = useState(false);
  const visibiltyRef = useRef(null);

  const [signup, result] = useMutation(CREATE_USER, {
    variables: { name, email, phone, password, gender },
    onError: (error) => {
      dispatch(notification(error.message, 5000));
      if (error.message.includes("confirmation code")) {
        setShowSignUp(!showSignUp);
        setHideComp(!hideComp);
      }
    },
    onCompleted: (_data) => {
      dispatch(notification("Registration successful", 3000));

      setName("");
      setPassword("");
      setPhone("");
      setGender("");

      setShowSignUp(!showSignUp);
      setHideComp(!hideComp);
    },
  });

  useEffect(() => {
    if (showPwd) {
      visibiltyRef.current = <VisibilityOff />;
    } else {
      visibiltyRef.current = <Visibility />;
    }
  }, [showPwd, visibiltyRef]);

  const handleSignup = async (e) => {
    e.preventDefault();

    signup();
  };

  const togglePwdVisibility = () => {
    setShowPwd(!showPwd);
  };

  return (
    <Container component="main" maxWidth="xs">
      {result.loading && (
        <CircularProgress
          sx={{
            bgcolor: "transparent",
            opacity: 0.5,
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            height: "100%",
            zIndex: 1000,
            textAlign: "center",
          }}
        />
      )}
      <Box sx={{ display: hideComp ? "none" : "" }}>
        <VerificationPage email={email} />
      </Box>
      <Box sx={{ display: showSignUp ? "" : "none" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography>Sign Up Here</Typography>
          <Box
            component="form"
            sx={{ mt: 2 }}
            onSubmit={(e) => handleSignup(e)}
          >
            <TextField
              label="Full Name"
              fullWidth
              required
              autoFocus
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              variant="standard"
            />
            <TextField
              label="Password"
              fullWidth
              variant="standard"
              required
              margin="normal"
              type={showPwd ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoCapitalize="true"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Box
                      ref={visibiltyRef}
                      onClick={togglePwdVisibility}
                      sx={{ cursor: "pointer" }}
                    >
                      {visibiltyRef.current}
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
            {/* <TextField
              label="Confirm Password"
              fullWidth
              variant="standard"
              margin="normal"
              type="password"
              required
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoCapitalize="true"
              error={password !== confirmPassword}
              helperText={
                password !== confirmPassword ? "password does not match." : ""
              }
            /> */}
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
      </Box>
    </Container>
  );
}

export default SignUpForm;

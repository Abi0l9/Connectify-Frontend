import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
  CircularProgress,
  Link,
} from "@mui/material";
import React, { useState } from "react";
import { LOGIN } from "../../../Queries/userQueries";
import { useDispatch } from "react-redux";
import { notification } from "../../../reducers/notificationReducer";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrorText, setLoginErrorText] = useState("");
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  const [login, result] = useMutation(LOGIN, {
    variables: { email, password },
    onError: (error) => {
      setLoginErrorText(error.message);
      setIsError(true);
    },
    onCompleted: (data) => {
      dispatch(notification("login successful", 3000));
      localStorage.setItem("userData", JSON.stringify(data.login));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsError(false);
    setLoginErrorText("");
    login();
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 3 }}>
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography>Login into your account</Typography>
        <Box
          component="form"
          sx={{ mt: 0.5 }}
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextField
            error={isError}
            helperText={loginErrorText}
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
            error={isError}
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
        <Box>
          <Typography variant="body2" color="gray">
            New User? Sign up <Link href="/sign-up">here</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginForm;

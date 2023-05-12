import { Box, TextField, Typography, Container, Link } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { notification } from "../../../../reducers/notificationReducer";

const VerificationPage = () => {
  const [code, setCode] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setCode(userData.regCode);
    }
  }, []);

  const handleCodeInput = (e) => {
    const input = e.target.value;
    if (input.length === 6 && input !== "codeyu") {
      dispatch(notification("Invalid/expired code", 7000));
    }
  };

  const handleCodeResend = () => {
    dispatch(notification("A new code has been sent to your mailbox", 7000));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: "4rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" textAlign="center">
          A 6-digits confirmation code has been sent to the provided email
          address.
        </Typography>
        <Typography
          variant="subtitle1"
          color="GrayText"
          sx={{
            mt: 4,
            mb: 1,
          }}
        >
          Please, paste the code into the text box, below.
        </Typography>
        <Box>
          <TextField
            label="Confirmation code"
            id="confirmation-code"
            onChange={handleCodeInput}
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography component="small" color="GrayText">
            Click{" "}
            <span>
              <Link underline="none" onClick={handleCodeResend}>here</Link>
            </span>{" "}
            to generate new code.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default VerificationPage;

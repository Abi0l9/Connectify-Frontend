import { Box, TextField, Typography, Container, Link } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { notification } from "../../../../reducers/notificationReducer";
import { useNavigate } from "react-router-dom";

const VerificationPage = ({ code }) => {
  const [newCode, setNewCode] = useState(code);
  const [inputCode, setInputCode] = useState("");
  const [hideResend, setHideResend] = useState("none");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setNewCode(userData.regCode);
    }
  }, []);

  useEffect(() => {
    if (inputCode.length === 6 && inputCode !== newCode) {
      dispatch(notification("Invalid/expired code", 3000));
      setHideResend("");
    } else if (inputCode.length === 6 && inputCode === newCode) {
      dispatch(notification("Verification Successful", 3000));
      navigate("/login");
    }
  }, [inputCode, dispatch, navigate, newCode]);

  const handleCodeInput = (e) => {
    setInputCode(e.target.value);
  };

  const handleCodeResend = () => {
    dispatch(notification("A new code has been sent to your mailbox", 3000));
    setHideResend("none");
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
        <Box sx={{ mt: 3, display: hideResend }}>
          <Typography component="small" color="GrayText">
            Click{" "}
            <span>
              <Link underline="none" onClick={handleCodeResend}>
                here
              </Link>
            </span>{" "}
            to generate new code.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default VerificationPage;

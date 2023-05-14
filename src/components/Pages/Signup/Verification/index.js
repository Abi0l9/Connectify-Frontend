import {
  Box,
  TextField,
  Typography,
  Container,
  Link,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { notification } from "../../../../reducers/notificationReducer";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CONFIRM_USER_REG, RESEND_CODE } from "../../../../Queries/userQueries";

const VerificationPage = ({ email }) => {
  const [regCode, setRegCode] = useState("");
  const [hideResend, setHideResend] = useState("none");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmReg, regConfirmResult] = useMutation(CONFIRM_USER_REG, {
    variables: { email, regCode },
    onError: (error) => {
      dispatch(notification(error.message, 4000));
      setHideResend("");
    },
    onCompleted: () => {
      dispatch(notification("Verification Successful", 4000));
      navigate("/login");
    },
  });

  const [resendCode] = useMutation(RESEND_CODE, {
    variables: { email },
    onError: (e) => {
      dispatch(notification(e.message, 4000));
    },
    onCompleted: () => {
      dispatch(notification("A new code has been sent to your mailbox", 3000));
      setHideResend("none");
    },
  });

  const handleCodeConfirm = () => {
    if (regCode.length === 6) {
      confirmReg();
    }
  };

  const handleCodeInput = (e) => {
    setRegCode(e.target.value);
  };

  const handleCodeResend = () => {
    resendCode();
  };

  return (
    <Container component="main" maxWidth="xs">
      {regConfirmResult.loading && (
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
          <Box sx={{ my: 1, textAlign: "center" }}>
            <Button
              onClick={handleCodeConfirm}
              type="button"
              variant="contained"
              color="success"
              size="small"
            >
              Confirm
            </Button>
          </Box>
        </Box>
        <Box sx={{ mt: 3, display: hideResend }}>
          <Typography component="small" color="GrayText">
            Click{" "}
            <span style={{ cursor: "pointer" }}>
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

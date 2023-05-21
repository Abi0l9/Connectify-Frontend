import { Box } from "@mui/material";
import LoginForm from "./LoginForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.curUser);

  useEffect(() => {
    if (loggedInUser) {
      navigate("/feed");
    }
  });

  return (
    <Box>
      <LoginForm />
    </Box>
  );
};

export default Login;

import { Box } from "@mui/material";
import LoginForm from "./LoginForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const curUser = JSON.parse(localStorage.getItem("userData"));
    setUser(curUser);
  });

  return (
    <Box>
      <LoginForm setUser={setUser} />
    </Box>
  );
};

export default Login;

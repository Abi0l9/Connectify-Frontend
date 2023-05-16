import { Box } from "@mui/material";
import LoginForm from "./LoginForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setData, user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    setData(data);
  });

  useEffect(() => {
    if (user) {
      navigate("/feed");
    }
  });

  return (
    <Box>
      <LoginForm setData={setData} />
    </Box>
  );
};

export default Login;

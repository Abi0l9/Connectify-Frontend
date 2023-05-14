import { Box } from "@mui/material";
import LoginForm from "./LoginForm";

const Login = ({ setUser }) => {
  return (
    <Box>
      <LoginForm setUser={setUser} />
    </Box>
  );
};

export default Login;

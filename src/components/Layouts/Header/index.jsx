import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";
import UserMenu from "./UserMenu";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Header({ logout }) {
  const loggedInUser = useSelector((state) => state.curUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link href="/" color="inherit" underline="none">
              <Typography variant="h4">Connectify</Typography>
            </Link>
          </Box>
          {!loggedInUser ? (
            <Box sx={{ display: "flex" }}>
              <Box>
                <Button variant="contained" sx={{ mx: 1 }}>
                  <Link href="/login" color="white" underline="none">
                    Login
                  </Link>
                </Button>
              </Box>
              <Box>
                <Button variant="outlined" sx={{ borderColor: "white" }}>
                  <Link href="/sign-up" color="white" underline="none">
                    Sign Up
                  </Link>
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <UserMenu logout={logout} />
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;

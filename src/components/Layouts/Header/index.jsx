import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";
import React from "react";

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link href="" color="inherit" underline="none">
              <Typography variant="h4">Connectify</Typography>
            </Link>
          </Box>
          <Box>
            <Button variant="contained" sx={{ mx: 1 }}>
              <Link href="" color="white" underline="none">
                Login
              </Link>
            </Button>
          </Box>
          <Box>
            <Button variant="outlined" sx={{ borderColor: "white" }}>
              <Link href="" color="white" underline="none">
                Sign Up
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;

import { GitHub, LinkedIn, Twitter } from "@mui/icons-material";
import { Box, Link, Stack, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <footer>
      <Box
        sx={{
          marginTop: "20px",
          bgcolor: "ThreeDDarkShadow",
          color: "whitesmoke",
          textAlign: "center",
          padding: ".5rem",
        }}
      >
        <Box
          sx={{
            fontFamily: "cursive",
            padding: ".5rem",
            my: 2,
          }}
        >
          Designed by Al-Khalifah😍👩🏽‍💻
        </Box>
        <Box sx={{}}>
          <Box>
            <Stack direction="row" spacing={3} justifyContent="center">
              <Link underline="hover" href="https://github.com/Abi0l9">
                {<GitHub color="white" />}
              </Link>

              <Link underline="hover" href="https://twitter.com/OyewaleM">
                {<Twitter color="white" />}
              </Link>

              <Link
                underline="hover"
                href="https://linkedin.com/in/monsur-oyedeji"
              >
                {<LinkedIn color="white" />}
              </Link>
            </Stack>
          </Box>
        </Box>
        <Typography fontFamily="sans-serif">
          Connectify &copy;{new Date().getFullYear()}
        </Typography>
      </Box>
    </footer>
  );
}

export default Footer;

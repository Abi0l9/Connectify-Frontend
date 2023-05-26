import {
  Avatar,
  Box,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import React from "react";

function Chats({ receivers, getSenderId }) {
  return (
    <Box>
      {receivers.map(
        (receiver) =>
          (
            <List sx={{ width: "100%" }} key={receiver.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: deepOrange[500] }}></Avatar>
                </ListItemAvatar>
                <Link
                  sx={{ cursor: "pointer" }}
                  onClick={() => getSenderId("inbox", receiver.id)}
                  underline="none"
                >
                  <ListItemText
                    sx={{
                      ":hover": {
                        backgroundColor: "lightskyblue",
                        padding: ".4rem",
                        borderRadius: ".4rem",
                        color: "white",
                      },

                      ":active": {
                        backgroundColor: "lightsteelblue",
                        padding: ".4rem",
                        borderRadius: ".4rem",
                        fontWeight: "bold",
                        color: "white",
                      },
                    }}
                    primary={receiver.name}
                  />
                </Link>
              </ListItem>
            </List>
          ) || (
            <Box sx={{ textAlign: "center" }}>
              <Typography>
                Start a conversation with one of your connects...
              </Typography>
            </Box>
          )
      )}
    </Box>
  );
}

export default Chats;

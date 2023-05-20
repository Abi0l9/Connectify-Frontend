import {
  Avatar,
  Box,
  List,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Tooltip,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Loading from "../../../Reusables/Loading";
import { Check, Close } from "@mui/icons-material";
import { useEffect, useRef } from "react";

const ListTemplate = ({ list, type }) => {
  let iconRef = useRef(null);

  useEffect(() => {
    if (type === "requests") {
      iconRef.current = (
        <Box>
          <Tooltip title="accept request">
            <IconButton edge="start">
              <Check color="success" />
            </IconButton>
          </Tooltip>
          <Tooltip title="cancel request">
            <IconButton edge="end">
              <Close color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      );
    } else if (type === "pendings") {
      iconRef.current = (
        <Box>
          <IconButton edge="end">
            <Tooltip title="cancel request">
              <Close color="error" />
            </Tooltip>
          </IconButton>
        </Box>
      );
    }
  }, [type]);

  return (
    <Box>
      {list?.map((user) => (
        <List sx={{ width: "100%" }} key={user.id}>
          <ListItem
            secondaryAction={<Box ref={iconRef}>{iconRef.current}</Box>}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: deepOrange[500] }}></Avatar>
            </ListItemAvatar>
            <Link href={`profile/${user.desired_name}`} underline="none">
              <ListItemText primary={user.name} />
            </Link>
          </ListItem>
        </List>
      )) || <Loading />}
    </Box>
  );
};

export default ListTemplate;

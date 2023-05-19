import {
  Avatar,
  Box,
  Container,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Loading from "../../../Reusables/Loading";

function AllUsers({ allUsers }) {
  return (
    <Container component="main">
      <Box>
        <Typography variant="h4">Connect with other users</Typography>
        <Box>
          {allUsers?.map((user) => (
            <List sx={{ width: "100%" }} key={user.id}>
              <ListItem>
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
      </Box>
    </Container>
  );
}

export default AllUsers;

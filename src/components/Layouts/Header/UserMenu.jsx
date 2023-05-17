import {
  ArrowDropDown,
  Inbox,
  Logout,
  Notifications,
  Person,
  Settings,
  VerifiedUserSharp,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  MenuItem,
  Typography,
  Menu,
  Badge,
  Link,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Reusables/Loading";

const UserMenu = ({ user, setData, logout }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const style = { display: open ? "" : "none" };

  const openMenu = (e) => {
    setOpen(!open);
  };

  const menuItems = [
    {
      name: "Profile",
      avatar: <Person />,
      action: () => navigate(`/profile/${user.id}`),
    },
    {
      name: "Friends",
      avatar: <VerifiedUserSharp />,
      action: () => navigate("/friends"),
    },
    { name: "Inbox", avatar: <Inbox />, action: () => null },
    { name: "Account", avatar: <Settings />, action: () => null },
    { name: "Logout", avatar: <Logout />, action: logout },
  ];

  if (!user) {
    return <Loading />;
  }

  return (
    <Box sx={{ display: "flex", mx: 1, alignItems: "center" }}>
      <Typography variant="body1" fontWeight="bold">
        <Link color="inherit" underline="none" href={`/profile/${user.userId}`}>
          {user?.name}
        </Link>
      </Typography>
      <Avatar sx={{ bgcolor: deepOrange[500], mx: 1 }}>
        {user?.name?.split(" ")[0][0]}
      </Avatar>
      <Badge color="secondary" badgeContent={3} max={99}>
        <Notifications color="white" />
      </Badge>
      <Box sx={style}>
        <Menu
          open={open}
          onClose={openMenu}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ mt: 4 }}
        >
          {menuItems.map((m) => (
            <MenuItem
              key={m.name}
              onClick={openMenu}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box onClick={m.action}>
                {m.avatar}
                <Box
                  component="span"
                  sx={{
                    ml: 1.5,
                  }}
                >
                  {m.name}
                </Box>
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <ArrowDropDown onClick={openMenu} />
    </Box>
  );
};

export default UserMenu;

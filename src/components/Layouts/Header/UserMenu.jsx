import {
  ArrowDropDown,
  Inbox,
  Logout,
  Notifications,
  Person,
  Settings,
} from "@mui/icons-material";
import { Avatar, Box, MenuItem, Typography, Menu, Badge } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserMenu = ({ user, setUser }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const style = { display: open ? "" : "none" };

  const openMenu = (e) => {
    setOpen(!open);
  };

  const logout = () => {
    localStorage.clear();
    setUser("");
    navigate("/login");
  };

  const menuItems = [
    { name: "Profile", avatar: <Person />, action: () => null },
    { name: "Inbox", avatar: <Inbox />, action: () => null },
    { name: "Account", avatar: <Settings />, action: () => null },
    { name: "Logout", avatar: <Logout />, action: logout },
  ];

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", mx: 1, alignItems: "center" }}>
      <Typography variant="body1" fontWeight="bold">
        {user?.name}
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

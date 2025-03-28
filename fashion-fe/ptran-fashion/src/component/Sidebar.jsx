import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Toolbar,
} from "@mui/material";
import {
  Dashboard,
  ExpandLess,
  ExpandMore,
  LocalOffer,
  AddCircleOutline,
  Home,
  FlashOn,
  Category,
  Sell,
  AccountCircle,
  Logout,
  Menu as MenuIcon,
} from "@mui/icons-material";

const menuItems = [
  {
    text: "Dashboard",
    icon: <Dashboard />,
    children: [],
  },
  {
    text: "Coupons",
    icon: <LocalOffer />,
    children: [
      { text: "Add New Coupon", icon: <AddCircleOutline /> },
      { text: "Coupon List", icon: <LocalOffer /> },
    ],
  },
  {
    text: "Shop By Category",
    icon: <Category />,
    children: [
      { text: "Electronics", icon: <FlashOn /> },
      { text: "Fashion", icon: <Sell /> },
    ],
  },
  {
    text: "Account",
    icon: <AccountCircle />,
    children: [],
  },
  {
    text: "Logout",
    icon: <Logout />,
    children: [],
  },
];

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [openSubMenu, setOpenSubMenu] = useState({});

  const handleToggle = (index) => {
    setOpenSubMenu((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <IconButton onClick={() => setOpen(!open)} sx={{ m: 2 }}>
        <MenuIcon />
      </IconButton>

      <Drawer variant="persistent" open={open} sx={{ width: 250, flexShrink: 0 }}>
        <Toolbar />
        <List sx={{ width: 250 }}>
          {menuItems.map((item, index) => (
            <div key={index}>
              <ListItemButton
                onClick={() => handleToggle(index)}
                sx={{
                  borderRadius: 5,
                  bgcolor: openSubMenu[index] ? "teal" : "transparent",
                  color: openSubMenu[index] ? "white" : "black",
                  "&:hover": { bgcolor: "teal", color: "white" },
                  m: 1,
                }}
              >
                <ListItemIcon sx={{ color: openSubMenu[index] ? "white" : "black" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
                {item.children.length > 0 &&
                  (openSubMenu[index] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>

              {/* Nếu có submenu, thì hiển thị Collapse */}
              {item.children.length > 0 && (
                <Collapse in={openSubMenu[index]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((subItem, subIndex) => (
                      <ListItemButton
                        key={subIndex}
                        sx={{
                          pl: 4,
                          borderRadius: 5,
                          "&:hover": { bgcolor: "lightgray" },
                        }}
                      >
                        <ListItemIcon>{subItem.icon}</ListItemIcon>
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </div>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box
} from "@mui/material";

import {
  Dashboard,
  Assignment,
  Business,
  Security,
  Settings,
  People
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import logo from "../assets/logo-sisinf.png";

const drawerWidth = 240;

export default function Sidebar() {

  const navigate = useNavigate();

  const { user } = useAuth();

  const userRoles =
    user?.roles || [];

  const items = [
    {
      text: "Dashboard",
      icon: <Dashboard />,
      path: "/",
      roles: ["ADMIN", "AUDITOR"]
    },
    {
      text: "Auditorías",
      icon: <Assignment />,
      path: "/auditorias",
      roles: ["ADMIN", "AUDITOR"]
    },
    {
      text: "Empresas",
      icon: <Business />,
      path: "/empresas",
      roles: ["ADMIN", "AUDITOR"]
    },
    {
      text: "Marcos",
      icon: <Security />,
      path: "/marcos",
      roles: ["ADMIN"]
    },
    {
      text: "Controles",
      icon: <Settings />,
      path: "/controles",
      roles: ["ADMIN"]
    },
    {
      text: "Usuarios",
      icon: <People />,
      path: "/usuarios",
      roles: ["ADMIN"]
    }
  ];

  const filteredItems =
    items.filter((item) =>
      item.roles.some((role) =>
        userRoles.includes(role)
      )
    );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "rgb(184, 178, 164)",
          backdropFilter: "blur(10px)",
          borderRight: "1px solid rgba(0, 0, 0, 0.08)"
        }
      }}
    >
      <Toolbar />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 2
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ width: "100px" }}
        />
      </Box>

      <List>
        {filteredItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() =>
              navigate(item.path)
            }
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primary={item.text}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
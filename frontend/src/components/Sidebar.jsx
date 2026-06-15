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
  People,
  Summarize
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import logo from "../assets/logo-sisinf.png";

const drawerWidth = 240;

export default function Sidebar() {

  const navigate = useNavigate();

  const items = [
    {
      text: "Dashboard",
      icon: <Dashboard />,
      path: "/"
    },
    {
      text: "Auditorías",
      icon: <Assignment />,
      path: "/auditorias"
    },
    {
      text: "Empresas",
      icon: <Business />,
      path: "/empresas"
    },
    {
      text: "Marcos",
      icon: <Security />,
      path: "/marcos"
    },
    {
      text: "Controles",
      icon: <Settings />,
      path: "/controles"
    },
    {
      text: "Usuarios",
      icon: <People />,
      path: "/usuarios"
    }
  ];

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
        <img src={logo} alt="Logo" style={{ width: "100px" }} />
      </Box>

      <List>

        {items.map((item) => (

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
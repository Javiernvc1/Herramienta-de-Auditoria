import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar
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
    },
    {
      text: "Reportes",
      icon: <Summarize />,
      path: "/reportes"
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
          boxSizing: "border-box"
        }
      }}
    >

      <Toolbar />

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
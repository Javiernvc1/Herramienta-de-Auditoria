import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton
} from "@mui/material";

import LogoutIcon
  from "@mui/icons-material/Logout";

import { useAuth }
  from "../context/AuthContext";

export default function Navbar() {

  const {
    user,
    logout
  } = useAuth();

  const drawerWidth = 240;

  return (

    <AppBar
      position="fixed"
      elevation={1}
      color="default"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "rgba(238, 238, 238, 0.79)",
        backdropFilter: "blur(10px)"
      }}
    >

      <Toolbar sx={{ justifyContent: "space-between" }}>
        
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textAlign: "left" }}
        >
          Sistema de Auditoría
        </Typography>

        <Box>

          <Typography
            variant="body2"
          >
            {user?.email}
          </Typography>

        </Box>

        <IconButton
          onClick={logout}
          color="error"
        >
          <LogoutIcon />
        </IconButton>

      </Toolbar>

    </AppBar>
  );
}
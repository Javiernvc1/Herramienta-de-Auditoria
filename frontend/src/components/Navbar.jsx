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

  return (

    <AppBar
      position="fixed"
      elevation={1}
      color="inherit"
    >

      <Toolbar>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
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
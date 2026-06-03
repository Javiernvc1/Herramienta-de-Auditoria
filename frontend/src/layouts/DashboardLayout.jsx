import {
  Box,
  Toolbar
} from "@mui/material";

import Navbar
  from "../components/Navbar";

import Sidebar
  from "../components/Sidebar";

export default function DashboardLayout({
  children
}) {

  return (

    <Box sx={{
      display: "flex"
    }}>

      <Navbar />

      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          bgcolor: "#f5f7fb",
          minHeight: "100vh"
        }}
      >

        <Toolbar />

        {children}

      </Box>

    </Box>
  );
}
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Box, Typography, Button } from "@mui/material";

export default function ProtectedRoute({
  children,
  allowedRoles = []
}) {
  const {
    isAuthenticated,
    loading,
    user
  } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  const userRoles =
    user?.roles || [];

  const hasPermission =
    allowedRoles.length === 0 ||
    allowedRoles.some((role) =>
      userRoles.includes(role)
    );

  if (!hasPermission) {
    return (
      <Box
        p={4}
        textAlign="center"
      >
        <Typography
          variant="h4"
          fontWeight={700}
          color="error"
          mb={2}
        >
          Acceso denegado
        </Typography>

        <Typography
          variant="body1"
          mb={3}
        >
          No tiene permisos para acceder a esta sección.
        </Typography>

        <Button
          variant="contained"
          onClick={() =>
            window.history.back()
          }
        >
          Volver
        </Button>
      </Box>
    );
  }

  return children;
}
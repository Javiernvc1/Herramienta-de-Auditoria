import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert
} from "@mui/material";

import { useAuth } from "../../context/AuthContext";

import logo from "../../assets/logo-sisinf.png";

export default function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    const success =
      await login(form);

    if (success) {

      navigate("/");

    } else {

      setError(
        "Correo o contraseña incorrectos"
      );
    }
  };

  return (

    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(166, 164, 164, 0.75)", px: 2 }}>

      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >

        <Paper
          elevation={3}
          sx={{
            width: "100%",
            p: 4,
            backgroundColor: "rgb(255, 249, 249)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(0, 0, 0, 0.08)"
          }}
        >

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img src={logo} alt="Logo" style={{ width: "100px" }} />
        </Box>

        <Typography
          variant="h4"
          align="center"
          gutterBottom
        >
          Sistema de Auditoría - SISINF
        </Typography>

        <Typography
          variant="body2"
          align="center"
          sx={{ mb: 3 }}
        >
          Iniciar sesión
        </Typography>

        {error && (

          <Alert
            severity="error"
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>

        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
        >

          <TextField
            fullWidth
            label="Correo"
            name="email"
            type="email"
            margin="normal"
            value={form.email}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            margin="normal"
            value={form.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
          >
            Ingresar
          </Button>

        </Box>

        </Paper>

      </Container>

    </Box>
  );
}
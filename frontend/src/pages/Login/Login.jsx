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

    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center"
      }}
    >

      <Paper
        elevation={3}
        sx={{
          width: "100%",
          p: 4
        }}
      >

        <Typography
          variant="h4"
          align="center"
          gutterBottom
        >
          Sistema de Auditoría
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
  );
}
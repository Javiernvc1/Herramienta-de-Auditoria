import {
  useEffect,
  useState
} from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import UsuarioDialog from "./UsuarioDialog";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from "../../services/user.service";

export default function Usuarios() {

  const [loading, setLoading] =
    useState(true);

  const [usuarios, setUsuarios] =
    useState([]);

  const [dialogOpen,
    setDialogOpen] =
    useState(false);

  const [editingUser,
    setEditingUser] =
    useState(null);

  const [nombre,
    setNombre] =
    useState("");

  const [apellido,
    setApellido] =
    useState("");

  const [email,
    setEmail] =
    useState("");

  const [roleId,
    setRoleId] =
    useState(1);

  const [password,
    setPassword] =
    useState("");

  const [newPassword,
    setNewPassword] =
    useState("");

  const [snackbar,
    setSnackbar] =
    useState({
      open: false,
      severity: "success",
      message: ""
    });

  useEffect(() => {

    cargarUsuarios();

  }, []);

  async function cargarUsuarios() {

    try {

      setLoading(true);

      const data =
        await getUsers();

      setUsuarios(data);

    } catch (error) {

      console.error(error);

      mostrarSnackbar(
        "Error al cargar usuarios",
        "error"
      );

    } finally {

      setLoading(false);
    }
  }

  function mostrarSnackbar(
    message,
    severity = "success"
  ) {

    setSnackbar({
      open: true,
      message,
      severity
    });
  }

  function limpiarFormulario() {

    setNombre("");
    setApellido("");
    setEmail("");
    setRoleId("");
    setPassword("");
    setNewPassword("");

    setEditingUser(null);
  }

  function handleCreateUser() {

    limpiarFormulario();

    setDialogOpen(true);
  }

  function handleEditUser(user) {

    setEditingUser(user);

    setNombre(user.nombre || "");
    setApellido(user.apellido || "");
    setEmail(user.email || "");

    setRoleId(
      user.Role?.name ||
      ""
    );

    setPassword("");
    setNewPassword("");

    setDialogOpen(true);
  }

  async function handleSaveUser() {

    try {

      if (editingUser) {

        await updateUser(
          editingUser.id,
          {
            nombre,
            apellido,
            email,
            roleId,
            password_hash:
              password,
            newPassword
          }
        );

        mostrarSnackbar(
          "Usuario actualizado"
        );

      } else {

        await createUser({
          nombre,
          apellido,
          email,
          roleId,
          password_hash:
            password
        });

        mostrarSnackbar(
          "Usuario creado"
        );
      }

      setDialogOpen(false);

      limpiarFormulario();

      await cargarUsuarios();

    } catch (error) {

      console.error(error);

      mostrarSnackbar(
        "Error al guardar usuario",
        "error"
      );
    }
  }

  async function handleDeleteUser(
    user
  ) {

    const confirmar =
      window.confirm(
        `¿Eliminar usuario ${user.nombre}?`
      );

    if (!confirmar)
      return;

    try {

      await deleteUser(
        user.id
      );

      mostrarSnackbar(
        "Usuario eliminado"
      );

      await cargarUsuarios();

    } catch (error) {

      console.error(error);

      mostrarSnackbar(
        "Error al eliminar usuario",
        "error"
      );
    }
  }

  if (loading) {

    return (

      <Box
        display="flex"
        justifyContent="center"
        mt={5}
      >
        <CircularProgress />
      </Box>

    );
  }

  return (

    <Box p={3}>

      <Box
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >

        <Typography
          variant="h4"
          fontWeight={700}
        >
          Gestión de Usuarios
          <br /><br />
        </Typography>

        <Button
          variant="contained"
          onClick={
            handleCreateUser
          }
        >
          Nuevo Usuario
        </Button>
        <br /><br />
      </Box>

      <Card >

        <CardContent>

          <Typography
            variant="h5"
            fontWeight={600}
          >
            Usuarios
          </Typography>

          <Divider
            sx={{ my: 2 }}
          />

          <List>

            {usuarios.map(
              (user) => (

                <ListItem
                  key={user.id}
                  secondaryAction={

                    <>

                      <IconButton
                        onClick={() =>
                          handleEditUser(
                            user
                          )
                        }
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() =>
                          handleDeleteUser(
                            user
                          )
                        }
                      >
                        <DeleteIcon />
                      </IconButton>

                    </>

                  }
                >

                  <ListItemText
                    primary={`${user.nombre} ${user.apellido}`}
                    secondary={
                      <>
                        {user.email}
                        {" - "}
                        {
                          user.Role
                            ?.name
                        }
                      </>
                    }
                  />

                </ListItem>

              )
            )}

          </List>

        </CardContent>

      </Card>

      <UsuarioDialog
        open={dialogOpen}
        onClose={() =>
          setDialogOpen(
            false
          )
        }
        onSave={
          handleSaveUser
        }
        editingUser={
          editingUser
        }
        nombre={nombre}
        setNombre={
          setNombre
        }
        apellido={apellido}
        setApellido={
          setApellido
        }
        email={email}
        setEmail={
          setEmail
        }
        roleId={roleId}
        setRoleId={
          setRoleId
        }
        password={password}
        setPassword={
          setPassword
        }
        newPassword={
          newPassword
        }
        setNewPassword={
          setNewPassword
        }
      />

      <Snackbar
        open={
          snackbar.open
        }
        autoHideDuration={
          4000
        }
        onClose={() =>
          setSnackbar(
            (prev) => ({
              ...prev,
              open: false
            })
          )
        }
      >

        <Alert
          severity={
            snackbar.severity
          }
          variant="filled"
        >
          {
            snackbar.message
          }
        </Alert>

      </Snackbar>

    </Box>

  );
}
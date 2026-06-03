import {
  useEffect,
  useState
} from "react";

import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  IconButton,
  Card,
  CardContent,
  Divider,
  Stack
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  getMarcos,
  createMarco,
  updateMarco,
  deleteMarco
} from "../../services/marco.service";

export default function Marcos() {

  const [marcos, setMarcos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [open, setOpen] =
    useState(false);

  const [nombre, setNombre] =
    useState("");

  const [editingMarco, setEditingMarco] =
    useState(null);

  const [snackbar, setSnackbar] =
    useState({
      open: false,
      message: "",
      severity: "success"
    });

  useEffect(() => {

    cargarMarcos();

  }, []);

  async function cargarMarcos() {

    try {

      setLoading(true);

      const data =
        await getMarcos();

      setMarcos(data);

    } catch (error) {

      console.error(error);

      setSnackbar({
        open: true,
        message:
          "Error cargando marcos",
        severity: "error"
      });

    } finally {

      setLoading(false);
    }
  }

  function handleCreate() {

    setEditingMarco(null);

    setNombre("");

    setOpen(true);
  }

  function handleEdit(marco) {

    setEditingMarco(marco);

    setNombre(
      marco.nombre
    );

    setOpen(true);
  }

  async function handleSave() {

    try {

      if (!nombre.trim()) {

        setSnackbar({
          open: true,
          message:
            "Debe ingresar un nombre",
          severity: "warning"
        });

        return;
      }

      if (editingMarco) {

        await updateMarco(
          editingMarco.id_marco,
          { nombre }
        );

        setSnackbar({
          open: true,
          message:
            "Marco actualizado correctamente",
          severity: "success"
        });

      } else {

        await createMarco({
          nombre
        });

        setSnackbar({
          open: true,
          message:
            "Marco creado correctamente",
          severity: "success"
        });
      }

      setOpen(false);

      cargarMarcos();

    } catch (error) {

      console.error(error);

      setSnackbar({
        open: true,
        message:
          "Error al guardar",
        severity: "error"
      });
    }
  }

  async function handleDelete(id) {

    const confirmar =
      window.confirm(
        "¿Está seguro de eliminar este marco?"
      );

    if (!confirmar) return;

    try {

      await deleteMarco(id);

      setSnackbar({
        open: true,
        message:
          "Marco eliminado correctamente",
        severity: "success"
      });

      cargarMarcos();

    } catch (error) {

      console.error(error);

      setSnackbar({
        open: true,
        message:
          "No se pudo eliminar el marco",
        severity: "error"
      });
    }
  }

  if (loading) {

    return (
      <Typography>
        Cargando...
      </Typography>
    );
  }

  return (

    <Box
      sx={{
        p: 4,
        maxWidth: 1400,
        mx: "auto"
      }}
    >

      {/* HEADER */}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >

        <Box>

          <Typography
            variant="h4"
            fontWeight={700}
          >
            Marcos de Auditoría
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
          >
            Administra los marcos normativos disponibles en el sistema.
          </Typography>

        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          Nuevo Marco
        </Button>

      </Box>

      {/* MÉTRICAS */}

      <Box mb={4}>

        <Card
          sx={{
            width: 220,
            borderRadius: 3
          }}
        >

          <CardContent>

            <Typography
              color="text.secondary"
            >
              Total Marcos
            </Typography>

            <Typography
              variant="h4"
              fontWeight={600}
            >
              {marcos.length}
            </Typography>

          </CardContent>

        </Card>

      </Box>

      {/* TABLA */}

      <Card
        elevation={3}
        sx={{
          borderRadius: 4
        }}
      >

        <CardContent sx={{ p: 3 }}>

          <Typography
            variant="h6"
            fontWeight={600}
            gutterBottom
          >
            Lista de Marcos
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Paper elevation={0}>

            <Table>

              <TableHead>

                <TableRow
                  sx={{
                    backgroundColor:
                      "rgba(25,118,210,0.08)"
                  }}
                >

                  <TableCell width={100}>
                    <strong>ID</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Nombre</strong>
                  </TableCell>

                  <TableCell
                    width={150}
                    align="center"
                  >
                    <strong>Acciones</strong>
                  </TableCell>

                </TableRow>

              </TableHead>

              <TableBody>

                {marcos.map(
                  (marco) => (

                    <TableRow
                      hover
                      key={
                        marco.id_marco
                      }
                      sx={{
                        "&:hover": {
                          backgroundColor:
                            "rgba(25,118,210,0.04)"
                        }
                      }}
                    >

                      <TableCell>
                        {marco.id_marco}
                      </TableCell>

                      <TableCell>
                        {marco.nombre}
                      </TableCell>

                      <TableCell
                        align="center"
                      >

                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="center"
                        >

                          <IconButton
                            color="primary"
                            onClick={() =>
                              handleEdit(
                                marco
                              )
                            }
                            sx={{
                              bgcolor:
                                "rgba(25,118,210,0.08)"
                            }}
                          >
                            <EditIcon />
                          </IconButton>

                          <IconButton
                            color="error"
                            onClick={() =>
                              handleDelete(
                                marco.id_marco
                              )
                            }
                            sx={{
                              bgcolor:
                                "rgba(211,47,47,0.08)"
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>

                        </Stack>

                      </TableCell>

                    </TableRow>

                  )
                )}

              </TableBody>

            </Table>

          </Paper>

        </CardContent>

      </Card>

      {/* DIALOG */}

      <Dialog
        open={open}
        onClose={() =>
          setOpen(false)
        }
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 4
          }
        }}
      >

        <DialogTitle>

          {editingMarco
            ? "Editar Marco"
            : "Nuevo Marco"}

        </DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            label="Nombre"
            margin="normal"
            value={nombre}
            onChange={(e) =>
              setNombre(
                e.target.value
              )
            }
          />

        </DialogContent>

        <DialogActions sx={{ p: 2 }}>

          <Button
            onClick={() =>
              setOpen(false)
            }
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
          >
            Guardar
          </Button>

        </DialogActions>

      </Dialog>

      {/* SNACKBAR */}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false
          })
        }
      >

        <Alert
          severity={
            snackbar.severity
          }
          variant="filled"
        >
          {snackbar.message}
        </Alert>

      </Snackbar>

    </Box>
  );
}
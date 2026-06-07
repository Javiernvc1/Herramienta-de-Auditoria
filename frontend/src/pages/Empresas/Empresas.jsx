import {
  useEffect,
  useState
} from "react";

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Button,
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Stack
} from "@mui/material";

import EmpresaDialog from "./EmpresaDialog";
import EquipoDialog from "./EquipoDialog";

import {
  getEmpresas,
  createEmpresa,
  updateEmpresa,
  deleteEmpresa
} from "../../services/empresa.service";

import {
  createEquipo,
  updateEquipo,
  deleteEquipo,
  assignEmpresa
} from "../../services/equipo.service";

export default function Empresas() {

  const [loading, setLoading] = useState(true);
  const [empresas, setEmpresas] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [equiposFiltrados, setEquiposFiltrados] = useState([]);

  const [empresaDialogOpen, setEmpresaDialogOpen] = useState(false);
  const [editingEmpresa, setEditingEmpresa] = useState(null);
  const [empresaNombre, setEmpresaNombre] = useState("");

  const [equipoDialogOpen, setEquipoDialogOpen] = useState(false);
  const [editingEquipo, setEditingEquipo] = useState(null);

  const [nombreOS, setNombreOS] = useState("");
  const [hostname, setHostname] = useState("");
  const [ip, setIp] = useState("");
  const [tipoConexion, setTipoConexion] = useState("");
  const [sshUsuario, setSshUsuario] = useState("");
  const [sshPassword, setSshPassword] = useState("");
  const [sshPuerto, setSshPuerto] = useState(22);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [deleteItem, setDeleteItem] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    try {
      setLoading(true);

      const empresasData = await getEmpresas();
      setEmpresas(empresasData);

      if (selectedEmpresa) {
        const empresaActual = empresasData.find(
          e => e.id_empresa === selectedEmpresa.id_empresa
        );

        if (empresaActual) {
          setSelectedEmpresa(empresaActual);
          setEquiposFiltrados(empresaActual.Equipos || []);
        }
      }

    } catch {
      mostrarError("Error cargando empresas");
    } finally {
      setLoading(false);
    }
  }

  function mostrarError(mensaje) {
    setSnackbar({
      open: true,
      message: mensaje,
      severity: "error"
    });
  }

  function mostrarSuccess(mensaje) {
    setSnackbar({
      open: true,
      message: mensaje,
      severity: "success"
    });
  }

  function handleCreateEmpresa() {
    setEditingEmpresa(null);
    setEmpresaNombre("");
    setEmpresaDialogOpen(true);
  }

  function handleEditEmpresa(empresa) {
    setEditingEmpresa(empresa);
    setEmpresaNombre(empresa.nombre);
    setEmpresaDialogOpen(true);
  }

  async function handleSaveEmpresa() {
    try {
      const payload = {
        nombre: empresaNombre
      };

      if (editingEmpresa) {
        await updateEmpresa(editingEmpresa.id_empresa, payload);
        mostrarSuccess("Empresa actualizada");
      } else {
        await createEmpresa(payload);
        mostrarSuccess("Empresa creada");
      }

      setEmpresaDialogOpen(false);
      cargarDatos();

    } catch {
      mostrarError("Error guardando empresa");
    }
  }

  function limpiarFormularioEquipo() {
    setNombreOS("");
    setHostname("");
    setIp("");
    setTipoConexion("");
    setSshUsuario("");
    setSshPassword("");
    setSshPuerto(22);
  }

  function handleCreateEquipo() {
    if (!selectedEmpresa) {
      mostrarError("Seleccione una empresa");
      return;
    }

    setEditingEquipo(null);
    limpiarFormularioEquipo();
    setEquipoDialogOpen(true);
  }

  function handleEditEquipo(equipo) {
    setEditingEquipo(equipo);
    setNombreOS(equipo.nombreOS || "");
    setHostname(equipo.hostname || "");
    setIp(equipo.ip || "");
    setTipoConexion(equipo.tipo_conexion || "");
    setSshUsuario(equipo.ssh_usuario || "");
    setSshPassword(equipo.ssh_password || "");
    setSshPuerto(equipo.ssh_puerto || 22);
    setEquipoDialogOpen(true);
  }

  async function handleSaveEquipo() {
    try {
      const payload = {
        nombreOS,
        hostname,
        ip,
        tipo_conexion: tipoConexion,
        ssh_usuario: tipoConexion === "SSH" ? sshUsuario : "",
        ssh_password: tipoConexion === "SSH" ? sshPassword : "",
        ssh_puerto: tipoConexion === "SSH" ? Number(sshPuerto) : 22
      };

      if (editingEquipo) {
        await updateEquipo(editingEquipo.id_equipo, payload);
        mostrarSuccess("Equipo actualizado");
      } else {
        const equipo = await createEquipo(payload);

        await assignEmpresa(
          equipo.id_equipo,
          selectedEmpresa.id_empresa
        );

        mostrarSuccess("Equipo creado");
      }

      setEquipoDialogOpen(false);
      limpiarFormularioEquipo();
      cargarDatos();

    } catch {
      mostrarError("Error guardando equipo");
    }
  }

  function confirmarEliminarEmpresa(empresa) {
    setDeleteType("empresa");
    setDeleteItem(empresa);
    setDeleteDialogOpen(true);
  }

  function confirmarEliminarEquipo(equipo) {
    setDeleteType("equipo");
    setDeleteItem(equipo);
    setDeleteDialogOpen(true);
  }

  async function handleDelete() {
    try {
      if (deleteType === "empresa") {
        await deleteEmpresa(deleteItem.id_empresa);
        mostrarSuccess("Empresa eliminada");
      }

      if (deleteType === "equipo") {
        await deleteEquipo(deleteItem.id_equipo);
        mostrarSuccess("Equipo eliminado");
      }

      setDeleteDialogOpen(false);
      cargarDatos();

    } catch {
      mostrarError("Error eliminando");
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
    <Box
      p={4}
      sx={{
        maxWidth: 1180
      }}
    >

      <Box mb={4}>

        <Stack spacing={2}>
          <Typography variant="h4" fontWeight={700}>
            Gestión de Empresas
          </Typography>

          <Typography color="text.secondary">
            Administración de empresas y equipos.
            <br />
            <br />
          </Typography>
        </Stack>

        <Box
          display="flex"
          gap={1.5}
          flexWrap="wrap"
        >
          <Chip
            color="primary"
            label={`${empresas.length} Empresas`}
            sx={{
              fontWeight: 600,
              px: 1
            }}
          />

          <Chip
            color="secondary"
            label={`${equiposFiltrados.length} Equipos`}
            sx={{
              fontWeight: 600,
              px: 1
            }}
          />
          <br />
          <br />
        </Box>

      </Box>

      <Grid
        container
        spacing={3}
        alignItems="flex-start"
      >

        <Grid
          item
          xs={12}
          md={5}
        >
          <Card
            sx={{
              borderRadius: 2,
              minHeight: 330
            }}
          >
            <CardContent sx={{ p: 3 }}>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2.5}
              >
                <Typography
                  variant="h6"
                  fontWeight={600}
                >
                  Empresas
                </Typography>

                <Button
                  variant="contained"
                  size="small"
                  onClick={handleCreateEmpresa}
                >
                  Nueva
                </Button>

                <br />
                <br />
              </Box>

              <Divider sx={{ mb: 1.5 }} />

              <List disablePadding>

                {empresas.map((empresa) => (

                  <ListItemButton
                    key={empresa.id_empresa}
                    selected={
                      selectedEmpresa?.id_empresa ===
                      empresa.id_empresa
                    }
                    onClick={() => {
                      setSelectedEmpresa(empresa);
                      setEquiposFiltrados(empresa.Equipos || []);
                    }}
                    sx={{
                      borderRadius: 1.5,
                      mb: 1,
                      py: 1.4
                    }}
                  >

                    <ListItemText
                      primary={
                        <Typography fontWeight={500}>
                          {empresa.nombre}
                        </Typography>
                      }
                      secondary={`${empresa.Equipos?.length || 0} equipos`}
                    />

                    <Box
                      display="flex"
                      gap={0.5}
                    >
                      <Button
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditEmpresa(empresa);
                        }}
                      >
                        Editar
                      </Button>

                      <Button
                        color="error"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmarEliminarEmpresa(empresa);
                        }}
                      >
                        Eliminar
                      </Button>
                    </Box>

                  </ListItemButton>
                ))}

              </List>

            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          md={7}
        >
          <Card
            sx={{
              borderRadius: 2,
              minHeight: 330
            }}
          >
            <CardContent sx={{ p: 3 }}>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2.5}
              >
                <Typography
                  variant="h6"
                  fontWeight={600}
                >
                  Equipos
                </Typography>

                <Button
                  variant="contained"
                  size="small"
                  onClick={handleCreateEquipo}
                >
                  Nuevo
                </Button>

                <br /><br />
              </Box>

              <Divider sx={{ mb: 1.5 }} />

              {!selectedEmpresa ? (

                <Typography
                  mt={2}
                  color="text.secondary"
                >
                  Seleccione una empresa
                </Typography>

              ) : (

                <List disablePadding>

                  {equiposFiltrados.map((equipo) => (

                    <ListItemButton
                      key={equipo.id_equipo}
                      sx={{
                        borderRadius: 1.5,
                        mb: 1,
                        py: 1.4
                      }}
                    >

                      <ListItemText
                        primary={
                          <Box
                            display="flex"
                            gap={1}
                            alignItems="center"
                          >
                            <Typography fontWeight={500}>
                              {equipo.hostname}
                            </Typography>

                            <Chip
                              size="small"
                              label={equipo.tipo_conexion}
                              color={
                                equipo.tipo_conexion === "SSH"
                                  ? "success"
                                  : "primary"
                              }
                              sx={{
                                height: 22,
                                fontWeight: 600
                              }}
                            />
                          </Box>
                        }
                        secondary={`${equipo.nombreOS} • ${equipo.ip}`}
                      />

                      <Box
                        display="flex"
                        gap={0.5}
                      >
                        <Button
                          size="small"
                          onClick={() =>
                            handleEditEquipo(equipo)
                          }
                        >
                          Editar
                        </Button>

                        <Button
                          color="error"
                          size="small"
                          onClick={() =>
                            confirmarEliminarEquipo(equipo)
                          }
                        >
                          Eliminar
                        </Button>
                      </Box>

                    </ListItemButton>
                  ))}

                </List>
              )}

            </CardContent>
          </Card>
        </Grid>

      </Grid>

      <EmpresaDialog
        open={empresaDialogOpen}
        onClose={() => setEmpresaDialogOpen(false)}
        onSave={handleSaveEmpresa}
        nombre={empresaNombre}
        setNombre={setEmpresaNombre}
        editingEmpresa={editingEmpresa}
      />

      <EquipoDialog
        open={equipoDialogOpen}
        onClose={() => setEquipoDialogOpen(false)}
        onSave={handleSaveEquipo}
        editingEquipo={editingEquipo}
        nombreOS={nombreOS}
        setNombreOS={setNombreOS}
        hostname={hostname}
        setHostname={setHostname}
        ip={ip}
        setIp={setIp}
        tipoConexion={tipoConexion}
        setTipoConexion={setTipoConexion}
        sshUsuario={sshUsuario}
        setSshUsuario={setSshUsuario}
        sshPassword={sshPassword}
        setSshPassword={setSshPassword}
        sshPuerto={sshPuerto}
        setSshPuerto={setSshPuerto}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>
          Confirmar eliminación
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            ¿Está seguro de eliminar este registro?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
          >
            Cancelar
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

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
          severity={snackbar.severity}
          sx={{
            width: "100%"
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Box>
  );
}
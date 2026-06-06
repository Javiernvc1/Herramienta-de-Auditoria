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
  DialogActions
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

  const [loading, setLoading] =
    useState(true);

  const [empresas, setEmpresas] =
    useState([]);

  const [selectedEmpresa,
    setSelectedEmpresa] =
    useState(null);

  const [equiposFiltrados,
    setEquiposFiltrados] =
    useState([]);

  // =====================
  // EMPRESA DIALOG
  // =====================

  const [empresaDialogOpen,
    setEmpresaDialogOpen] =
    useState(false);

  const [editingEmpresa,
    setEditingEmpresa] =
    useState(null);

  const [empresaNombre,
    setEmpresaNombre] =
    useState("");

  // =====================
  // EQUIPO DIALOG
  // =====================

  const [equipoDialogOpen,
    setEquipoDialogOpen] =
    useState(false);

  const [editingEquipo,
    setEditingEquipo] =
    useState(null);

  const [nombreOS,
    setNombreOS] =
    useState("");

  const [hostname,
    setHostname] =
    useState("");

  const [ip,
    setIp] =
    useState("");

  // =====================
  // DELETE
  // =====================

  const [deleteDialogOpen,
    setDeleteDialogOpen] =
    useState(false);

  const [deleteType,
    setDeleteType] =
    useState("");

  const [deleteItem,
    setDeleteItem] =
    useState(null);

  // =====================
  // SNACKBAR
  // =====================

  const [snackbar,
    setSnackbar] =
    useState({
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

      const empresasData =
        await getEmpresas();

      setEmpresas(empresasData);

      if (
        selectedEmpresa
      ) {

        const empresaActual =
          empresasData.find(
            (e) =>
              e.id_empresa ===
              selectedEmpresa.id_empresa
          );

        if (
          empresaActual
        ) {

          setSelectedEmpresa(
            empresaActual
          );

          setEquiposFiltrados(
            empresaActual.Equipos ||
            []
          );
        }
      }

    } catch (error) {

      mostrarError(
        "Error cargando empresas"
      );

    } finally {

      setLoading(false);
    }
  }

  // =====================
  // SNACKBAR
  // =====================

  function mostrarError(
    mensaje
  ) {

    setSnackbar({
      open: true,
      message: mensaje,
      severity: "error"
    });
  }

  function mostrarSuccess(
    mensaje
  ) {

    setSnackbar({
      open: true,
      message: mensaje,
      severity: "success"
    });
  }

  // =====================
  // EMPRESAS
  // =====================

  function handleCreateEmpresa() {

    setEditingEmpresa(
      null
    );

    setEmpresaNombre("");

    setEmpresaDialogOpen(
      true
    );
  }

  function handleEditEmpresa(
    empresa
  ) {

    setEditingEmpresa(
      empresa
    );

    setEmpresaNombre(
      empresa.nombre
    );

    setEmpresaDialogOpen(
      true
    );
  }

  async function handleSaveEmpresa() {

    try {

      const payload = {
        nombre:
          empresaNombre
      };

      if (
        editingEmpresa
      ) {

        await updateEmpresa(
          editingEmpresa.id_empresa,
          payload
        );

        mostrarSuccess(
          "Empresa actualizada"
        );

      } else {

        await createEmpresa(
          payload
        );

        mostrarSuccess(
          "Empresa creada"
        );
      }

      setEmpresaDialogOpen(
        false
      );

      cargarDatos();

    } catch {

      mostrarError(
        "Error guardando empresa"
      );
    }
  }

  // =====================
  // EQUIPOS
  // =====================

  function handleCreateEquipo() {

    if (
      !selectedEmpresa
    ) {

      mostrarError(
        "Seleccione una empresa"
      );

      return;
    }

    setEditingEquipo(
      null
    );

    setNombreOS("");
    setHostname("");
    setIp("");

    setEquipoDialogOpen(
      true
    );
  }

  function handleEditEquipo(
    equipo
  ) {

    setEditingEquipo(
      equipo
    );

    setNombreOS(
      equipo.nombreOS
    );

    setHostname(
      equipo.hostname
    );

    setIp(
      equipo.ip
    );

    setEquipoDialogOpen(
      true
    );
  }

  async function handleSaveEquipo() {

    try {

      const payload = {
        nombreOS,
        hostname,
        ip
      };

      if (
        editingEquipo
      ) {

        await updateEquipo(
          editingEquipo.id_equipo,
          payload
        );

        mostrarSuccess(
          "Equipo actualizado"
        );

      } else {

        const equipo =
          await createEquipo(
            payload
          );

        await assignEmpresa(
          equipo.id_equipo,
          selectedEmpresa.id_empresa
        );

        mostrarSuccess(
          "Equipo creado"
        );
      }

      setEquipoDialogOpen(
        false
      );

      cargarDatos();

    } catch {

      mostrarError(
        "Error guardando equipo"
      );
    }
  }

  // =====================
  // DELETE
  // =====================

  function confirmarEliminarEmpresa(
    empresa
  ) {

    setDeleteType(
      "empresa"
    );

    setDeleteItem(
      empresa
    );

    setDeleteDialogOpen(
      true
    );
  }

  function confirmarEliminarEquipo(
    equipo
  ) {

    setDeleteType(
      "equipo"
    );

    setDeleteItem(
      equipo
    );

    setDeleteDialogOpen(
      true
    );
  }

  async function handleDelete() {

    try {

      if (
        deleteType ===
        "empresa"
      ) {

        await deleteEmpresa(
          deleteItem.id_empresa
        );

        mostrarSuccess(
          "Empresa eliminada"
        );
      }

      if (
        deleteType ===
        "equipo"
      ) {

        await deleteEquipo(
          deleteItem.id_equipo
        );

        mostrarSuccess(
          "Equipo eliminado"
        );
      }

      setDeleteDialogOpen(
        false
      );

      cargarDatos();

    } catch {

      mostrarError(
        "Error eliminando"
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

      <Typography
        variant="h4"
        fontWeight={700}
        mb={1}
      >
        Gestión de Empresas
      </Typography>

      <Typography
        color="text.secondary"
        mb={3}
      >
        Administración de
        empresas y equipos.
      </Typography>

      <Box
        display="flex"
        gap={2}
        mb={3}
      >

        <Chip
          color="primary"
          label={`${empresas.length} Empresas`}
        />

        <Chip
          color="secondary"
          label={`${equiposFiltrados.length} Equipos`}
        />

      </Box>

      <Grid
        container
        spacing={3}
      >

        {/* EMPRESAS */}

        <Grid
          item
          xs={12}
          md={5}
        >

          <Card>

            <CardContent>

              <Box
                display="flex"
                justifyContent="space-between"
                mb={2}
              >

                <Typography
                  variant="h6"
                >
                  Empresas
                </Typography>

                <Button
                  variant="contained"
                  onClick={
                    handleCreateEmpresa
                  }
                >
                  Nueva
                </Button>

              </Box>

              <Divider />

              <List>

                {empresas.map(
                  (
                    empresa
                  ) => (

                    <ListItemButton
                      key={
                        empresa.id_empresa
                      }
                      selected={
                        selectedEmpresa?.id_empresa ===
                        empresa.id_empresa
                      }
                      onClick={() => {

                        setSelectedEmpresa(
                          empresa
                        );

                        setEquiposFiltrados(
                          empresa.Equipos ||
                          []
                        );
                      }}
                    >

                      <ListItemText
                        primary={
                          empresa.nombre
                        }
                        secondary={`${empresa.Equipos?.length || 0} equipos`}
                      />

                      <Button
                        size="small"
                        onClick={(e) => {

                          e.stopPropagation();

                          handleEditEmpresa(
                            empresa
                          );
                        }}
                      >
                        Editar
                      </Button>

                      <Button
                        color="error"
                        size="small"
                        onClick={(e) => {

                          e.stopPropagation();

                          confirmarEliminarEmpresa(
                            empresa
                          );
                        }}
                      >
                        Eliminar
                      </Button>

                    </ListItemButton>

                  )
                )}

              </List>

            </CardContent>

          </Card>

        </Grid>

        {/* EQUIPOS */}

        <Grid
          item
          xs={12}
          md={7}
        >

          <Card>

            <CardContent>

              <Box
                display="flex"
                justifyContent="space-between"
                mb={2}
              >

                <Typography
                  variant="h6"
                >
                  Equipos
                </Typography>

                <Button
                  variant="contained"
                  onClick={
                    handleCreateEquipo
                  }
                >
                  Nuevo
                </Button>

              </Box>

              <Divider />

              {!selectedEmpresa ? (

                <Typography
                  mt={2}
                  color="text.secondary"
                >
                  Seleccione una empresa
                </Typography>

              ) : (

                <List>

                  {equiposFiltrados.map(
                    (
                      equipo
                    ) => (

                      <ListItemButton
                        key={
                          equipo.id_equipo
                        }
                      >

                        <ListItemText
                          primary={
                            equipo.hostname
                          }
                          secondary={`${equipo.nombreOS} • ${equipo.ip}`}
                        />

                        <Button
                          size="small"
                          onClick={() =>
                            handleEditEquipo(
                              equipo
                            )
                          }
                        >
                          Editar
                        </Button>

                        <Button
                          color="error"
                          size="small"
                          onClick={() =>
                            confirmarEliminarEquipo(
                              equipo
                            )
                          }
                        >
                          Eliminar
                        </Button>

                      </ListItemButton>

                    )
                  )}

                </List>

              )}

            </CardContent>

          </Card>

        </Grid>

      </Grid>

      <EmpresaDialog
        open={
          empresaDialogOpen
        }
        onClose={() =>
          setEmpresaDialogOpen(
            false
          )
        }
        onSave={
          handleSaveEmpresa
        }
        nombre={
          empresaNombre
        }
        setNombre={
          setEmpresaNombre
        }
        editingEmpresa={
          editingEmpresa
        }
      />

      <EquipoDialog
        open={
          equipoDialogOpen
        }
        onClose={() =>
          setEquipoDialogOpen(
            false
          )
        }
        onSave={
          handleSaveEquipo
        }
        editingEquipo={
          editingEquipo
        }
        nombreOS={
          nombreOS
        }
        setNombreOS={
          setNombreOS
        }
        hostname={
          hostname
        }
        setHostname={
          setHostname
        }
        ip={ip}
        setIp={setIp}
      />

      <Dialog
        open={
          deleteDialogOpen
        }
        onClose={() =>
          setDeleteDialogOpen(
            false
          )
        }
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
            onClick={() =>
              setDeleteDialogOpen(
                false
              )
            }
          >
            Cancelar
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={
              handleDelete
            }
          >
            Eliminar
          </Button>

        </DialogActions>

      </Dialog>

      <Snackbar
        open={
          snackbar.open
        }
        autoHideDuration={
          3000
        }
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
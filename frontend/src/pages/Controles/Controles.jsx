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
  Chip,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";

import {
  getControles,
  createControl,
  updateControl,
  deleteControl,
  assignMarco,
  removeMarco
} from "../../services/control.service";

import {
  getParametros,
  createParametro,
  updateParametro,
  deleteParametro,
  assignControl
} from "../../services/parametro.service";

import {
  getMarcos
} from "../../services/marco.service";


import ControlDialog
  from "./ControlDialog";

import {
  getScripts,
  createScript,
  updateScript,
  deleteScript,
  assignParametro
} from "../../services/script.service";



export default function Controles() {

  const [loading, setLoading] =
    useState(true);

  const [controles, setControles] =
    useState([]);

  const [parametros, setParametros] =
    useState([]);

  const [scripts, setScripts] =
    useState([]);

  const [selectedControl,
    setSelectedControl] =
    useState(null);

  const [selectedParametro,
    setSelectedParametro] =
    useState(null);

  const [marcos, setMarcos] =
    useState([]);

  const [dialogOpen,
    setDialogOpen] =
    useState(false);

  const [editingControl,
    setEditingControl] =
    useState(null);

  const [scriptSO,
    setScriptSO] =
    useState("windows");

  const [scriptFile,
    setScriptFile] =
    useState(null);
  const [snackbar,
    setSnackbar] =
    useState({
      open: false,
      message: "",
      severity: "success"
    });

  const [scriptDialogOpen,
    setScriptDialogOpen] =
    useState(false);

  const [editingScript,
    setEditingScript] =
    useState(null);

  const [scriptNombre,
    setScriptNombre] =
    useState("");

  const [scriptTipo,
    setScriptTipo] =
    useState("powershell");

  const [scriptRuta,
    setScriptRuta] =
    useState("");

  const [scriptComando,
    setScriptComando] =
    useState("");

  const [parametroDialogOpen,
    setParametroDialogOpen] =
    useState(false);

  const [editingParametro,
    setEditingParametro] =
    useState(null);

  const [parametroNombre,
    setParametroNombre] =
    useState("");

  const [parametroDescripcion,
    setParametroDescripcion] =
    useState("");

  const [parametroValorEsperado,
    setParametroValorEsperado] =
    useState("");

  useEffect(() => {

    cargarDatos();

  }, []);

  async function cargarDatos() {

    try {

      setLoading(true);

      const [
        controlesData,
        parametrosData,
        scriptsData,
        marcosData
      ] = await Promise.all([
        getControles(),
        getParametros(),
        getScripts(),
        getMarcos()
      ]);

      setControles(controlesData);

      setParametros(parametrosData);

      setScripts(scriptsData);

      setMarcos(marcosData);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  function handleCreateControl() {

    setEditingControl(null);

    setDialogOpen(true);
  }

  function handleEditControl(control) {

    setEditingControl(control);

    setDialogOpen(true);
  }

  async function handleSaveControl(data) {

    try {

      if (editingControl) {

        await updateControl(
          editingControl.id_control,
          {
            nombre: data.nombre
          }
        );

        const marcoActual =
          editingControl.Marcos?.[0];

        if (
          marcoActual &&
          marcoActual.id_marco !== data.marcoId
        ) {

          await removeMarco(
            editingControl.id_control,
            marcoActual.id_marco
          );

          await assignMarco(
            editingControl.id_control,
            data.marcoId
          );
        }

        setSnackbar({
          open: true,
          message:
            "Control actualizado",
          severity: "success"
        });

      } else {

        const control =
          await createControl({
            nombre: data.nombre
          });

        await assignMarco(
          control.id_control,
          data.marcoId
        );

        setSnackbar({
          open: true,
          message:
            "Control creado",
          severity: "success"
        });
      }

      setDialogOpen(false);

      cargarDatos();

    } catch (error) {

      console.error(error);

      setSnackbar({
        open: true,
        message:
          "Error guardando control",
        severity: "error"
      });
    }
  }

  async function handleDeleteControl(id) {

    const confirmar =
      window.confirm(
        "¿Eliminar control?"
      );

    if (!confirmar) return;

    try {

      await deleteControl(id);

      setSnackbar({
        open: true,
        message:
          "Control eliminado",
        severity: "success"
      });

      if (
        selectedControl?.id_control === id
      ) {

        setSelectedControl(null);

        setSelectedParametro(null);
      }

      cargarDatos();

    } catch (error) {

      console.error(error);

      setSnackbar({
        open: true,
        message:
          "Error eliminando control",
        severity: "error"
      });
    }
  }

  const parametrosFiltrados =
    selectedControl
      ? parametros.filter(
        (parametro) =>
          parametro.Controls?.some(
            (control) =>
              control.id_control ===
              selectedControl.id_control
          )
      )
      : [];

  const scriptsFiltrados =
    selectedParametro
      ? scripts.filter(
        (script) =>
          script.Parametros?.some(
            (parametro) =>
              parametro.id_parametro ===
              selectedParametro.id_parametro
          )
      )
      : [];

  function handleCreateParametro() {

    if (!selectedControl) {

      setSnackbar({
        open: true,
        message:
          "Seleccione un control",
        severity: "warning"
      });

      return;
    }

    setEditingParametro(null);

    setParametroNombre("");

    setParametroDescripcion("");

    setParametroValorEsperado("");

    setParametroDialogOpen(true);
  }

  function handleEditParametro(parametro) {

    setEditingParametro(parametro);

    setParametroNombre(
      parametro.nombre
    );

    setParametroDescripcion(
      parametro.descripcion
    );

    setParametroValorEsperado(
      parametro.valor_esperado
    );

    setParametroDialogOpen(true);
  }

  async function handleSaveParametro() {

    try {

      if (
        !parametroNombre.trim()
      ) {

        setSnackbar({
          open: true,
          message:
            "Debe ingresar nombre",
          severity: "warning"
        });

        return;
      }

      if (editingParametro) {

        await updateParametro(
          editingParametro.id_parametro,
          {
            nombre:
              parametroNombre,
            descripcion:
              parametroDescripcion,
            valor_esperado:
              parametroValorEsperado
          }
        );

        setSnackbar({
          open: true,
          message:
            "Parámetro actualizado",
          severity: "success"
        });

      } else {

        const parametro =
          await createParametro({
            nombre:
              parametroNombre,
            descripcion:
              parametroDescripcion,
            valor_esperado:
              parametroValorEsperado
          });

        await assignControl(
          parametro.id_parametro,
          selectedControl.id_control
        );

        setSnackbar({
          open: true,
          message:
            "Parámetro creado",
          severity: "success"
        });
      }

      setParametroDialogOpen(
        false
      );

      cargarDatos();

    } catch (error) {

      console.error(error);

      setSnackbar({
        open: true,
        message:
          "Error guardando parámetro",
        severity: "error"
      });
    }
  }

  async function handleDeleteParametro(id) {

    const confirmar =
      window.confirm(
        "¿Eliminar parámetro?"
      );

    if (!confirmar) return;

    try {

      await deleteParametro(id);

      setSnackbar({
        open: true,
        message:
          "Parámetro eliminado",
        severity: "success"
      });

      if (
        selectedParametro
          ?.id_parametro === id
      ) {

        setSelectedParametro(
          null
        );
      }

      cargarDatos();

    } catch (error) {

      console.error(error);

      setSnackbar({
        open: true,
        message:
          "Error eliminando parámetro",
        severity: "error"
      });
    }
  }

  useEffect(() => {

    if (
      scriptTipo ===
      "powershell"
    ) {

      setScriptComando(
        "powershell.exe -ExecutionPolicy Bypass -File"
      );

    } else if (
      scriptTipo ===
      "bash"
    ) {

      setScriptComando(
        "bash"
      );
    }

  }, [scriptTipo]);

  function handleCreateScript() {

    if (!selectedParametro) {

      setSnackbar({
        open: true,
        message:
          "Seleccione un parámetro",
        severity: "warning"
      });

      return;
    }

    setEditingScript(null);

    setScriptNombre("");

    setScriptTipo(
      "powershell"
    );

    setScriptSO("windows");

    setScriptFile(null);

    setScriptRuta("");

    setScriptComando("");

    setScriptDialogOpen(
      true
    );
  }

  function handleEditScript(
    script
  ) {

    setEditingScript(
      script
    );

    setScriptNombre(
      script.nombre
    );

    setScriptTipo(
      script.tipo
    );

    setScriptRuta(
      script.ruta
    );

    setScriptComando(
      script.comando
    );

    setScriptDialogOpen(
      true
    );

    setScriptSO(
      script.sistema_operativo ||
      "windows"
    );

    setScriptFile(null);
  }

  async function handleSaveScript() {

    try {

      if (
        !scriptNombre.trim()
      ) {

        setSnackbar({
          open: true,
          message:
            "Ingrese un nombre",
          severity: "warning"
        });

        return;
      }

      if (editingScript) {

        await updateScript(
          editingScript.id_script,
          {

            nombre:
              scriptNombre,

            tipo:
              scriptTipo,

            comando:
              scriptComando,

            sistema_operativo:
              scriptSO,

            id_parametro:
              selectedParametro.id_parametro,

            archivo:
              scriptFile
          }
        );

        setSnackbar({
          open: true,
          message:
            "Script actualizado",
          severity: "success"
        });

      } else {

        const script =
          await createScript({

            nombre:
              scriptNombre,

            tipo:
              scriptTipo,

            comando:
              scriptComando,

            sistema_operativo:
              scriptSO,

            id_parametro:
              selectedParametro.id_parametro,

            archivo:
              scriptFile
          });

        await assignParametro(
          script.id_script,
          selectedParametro.id_parametro
        );

        setSnackbar({
          open: true,
          message:
            "Script creado",
          severity: "success"
        });
      }

      setScriptDialogOpen(
        false
      );

      cargarDatos();

    } catch (error) {

      console.error(error);

      setSnackbar({
        open: true,
        message:
          "Error guardando script",
        severity: "error"
      });
    }
  }

  async function handleDeleteScript(
    id
  ) {

    const confirmar =
      window.confirm(
        "¿Eliminar script?"
      );

    if (!confirmar) return;

    try {

      await deleteScript(id);

      setSnackbar({
        open: true,
        message:
          "Script eliminado",
        severity: "success"
      });

      cargarDatos();

    } catch (error) {

      console.error(error);

      setSnackbar({
        open: true,
        message:
          "Error eliminando script",
        severity: "error"
      });
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

      {/* CABECERA */}

      <Box mb={4}>

        <Typography
          variant="h4"
          fontWeight={700}
        >
          Gestión de Controles
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
        >
          Administra controles,
          parámetros y scripts
          asociados a cada marco.
        </Typography>

      </Box>

      {/* RESUMEN */}

      <Box
        display="flex"
        gap={2}
        mb={3}
      >

        <Chip
          label={`${controles.length} Controles`}
          color="primary"
        />

        <Chip
          label={`${parametros.length} Parámetros`}
          color="secondary"
        />

        <Chip
          label={`${scripts.length} Scripts`}
          color="success"
        />

      </Box>

      <Grid
        container
        spacing={3}
      >

        {/* CONTROLES */}

        <Grid
          item
          xs={12}
          md={4}
        >

          <Card
            sx={{
              height: "70vh"
            }}
          >

            <CardContent>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >

                <Typography
                  variant="h6"
                  fontWeight={600}
                >
                  Controles
                </Typography>

                <Button
                  size="small"
                  variant="contained"
                  onClick={
                    handleCreateControl
                  }
                >
                  Nuevo
                </Button>

              </Box>

              <Divider
                sx={{ my: 2 }}
              />

              <List>

                {controles.map(
                  (control) => (

                    <Box
                      key={
                        control.id_control
                      }
                      display="flex"
                      alignItems="center"
                    >

                      <ListItemButton
                        sx={{
                          borderRadius: 1,
                          mr: 1
                        }}
                        selected={
                          selectedControl
                            ?.id_control ===
                          control.id_control
                        }
                        onClick={() => {

                          setSelectedControl(
                            control
                          );

                          setSelectedParametro(
                            null
                          );
                        }}
                      >

                        <ListItemText
                          primary={
                            control.nombre
                          }
                          secondary={
                            control.Marcos?.[0]
                              ?.nombre
                          }
                        />

                      </ListItemButton>

                      <Button
                        size="small"
                        onClick={() =>
                          handleEditControl(
                            control
                          )
                        }
                      >
                        Editar
                      </Button>

                      <Button
                        size="small"
                        color="error"
                        onClick={() =>
                          handleDeleteControl(
                            control.id_control
                          )
                        }
                      >
                        Eliminar
                      </Button>

                    </Box>

                  )
                )}

              </List>

            </CardContent>

          </Card>

        </Grid>

        {/* PARAMETROS */}

        <Grid
          item
          xs={12}
          md={4}
        >

          <Card
            sx={{
              height: "70vh"
            }}
          >

            <CardContent>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >

                <Typography
                  variant="h6"
                  fontWeight={600}
                >
                  Parámetros
                </Typography>

                <Button
                  size="small"
                  variant="contained"
                  onClick={
                    handleCreateParametro
                  }
                >
                  Nuevo
                </Button>

              </Box>

              <Divider
                sx={{ my: 2 }}
              />

              {!selectedControl ? (

                <Typography
                  color="text.secondary"
                >
                  Seleccione un control
                </Typography>

              ) : (

                <List>

                  {parametrosFiltrados.map(
                    (parametro) => (

                      <Box
                        key={
                          parametro.id_parametro
                        }
                        display="flex"
                        alignItems="center"
                      >

                        <ListItemButton
                          sx={{
                            borderRadius: 1,
                            mr: 1
                          }}
                          selected={
                            selectedParametro
                              ?.id_parametro ===
                            parametro.id_parametro
                          }
                          onClick={() =>
                            setSelectedParametro(
                              parametro
                            )
                          }
                        >

                          <ListItemText
                            primary={
                              parametro.nombre
                            }
                            secondary={
                              parametro.descripcion
                            }
                          />

                        </ListItemButton>

                        <Button
                          size="small"
                          onClick={() =>
                            handleEditParametro(
                              parametro
                            )
                          }
                        >
                          Editar
                        </Button>

                        <Button
                          size="small"
                          color="error"
                          onClick={() =>
                            handleDeleteParametro(
                              parametro.id_parametro
                            )
                          }
                        >
                          Eliminar
                        </Button>

                      </Box>

                    )
                  )}

                </List>

              )}

            </CardContent>

          </Card>

        </Grid>

        {/* SCRIPTS */}

        <Grid
          item
          xs={12}
          md={4}
        >

          <Card
            sx={{
              height: "70vh"
            }}
          >

            <CardContent>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >

                <Typography
                  variant="h6"
                  fontWeight={600}
                >
                  Scripts
                </Typography>

                <Button
                  size="small"
                  variant="contained"
                  onClick={
                    handleCreateScript
                  }
                >
                  Nuevo
                </Button>

              </Box>

              <Divider
                sx={{ my: 2 }}
              />

              {!selectedParametro ? (

                <Typography
                  color="text.secondary"
                >
                  Seleccione un parámetro
                </Typography>

              ) : (

                <List>

                  {scriptsFiltrados.map(
                    (script) => (

                      <Box
                        key={
                          script.id_script
                        }
                        display="flex"
                        alignItems="center"
                      >

                        <ListItemButton>

                          <ListItemText
                            primary={
                              script.nombre
                            }
                            secondary={
                              `${script.tipo} • ${script.sistema_operativo ||
                              "windows"
                              }`
                            }
                          />

                        </ListItemButton>

                        <Button
                          size="small"
                          onClick={() =>
                            handleEditScript(
                              script
                            )
                          }
                        >
                          Editar
                        </Button>

                        <Button
                          size="small"
                          color="error"
                          onClick={() =>
                            handleDeleteScript(
                              script.id_script
                            )
                          }
                        >
                          Eliminar
                        </Button>

                      </Box>

                    )
                  )}

                </List>

              )}

            </CardContent>

          </Card>

        </Grid>

      </Grid>

      <ControlDialog
        open={dialogOpen}
        onClose={() =>
          setDialogOpen(false)
        }
        onSave={
          handleSaveControl
        }
        control={
          editingControl
        }
        marcos={marcos}
      />

      <Dialog
        open={
          parametroDialogOpen
        }
        onClose={() =>
          setParametroDialogOpen(
            false
          )
        }
        fullWidth
        maxWidth="sm"
      >

        <DialogTitle>

          {editingParametro
            ? "Editar Parámetro"
            : "Nuevo Parámetro"}

        </DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            margin="normal"
            label="Nombre"
            value={
              parametroNombre
            }
            onChange={(e) =>
              setParametroNombre(
                e.target.value
              )
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Descripción"
            value={
              parametroDescripcion
            }
            onChange={(e) =>
              setParametroDescripcion(
                e.target.value
              )
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Valor Esperado"
            value={
              parametroValorEsperado
            }
            onChange={(e) =>
              setParametroValorEsperado(
                e.target.value
              )
            }
          />

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() =>
              setParametroDialogOpen(
                false
              )
            }
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={
              handleSaveParametro
            }
          >
            Guardar
          </Button>

        </DialogActions>

      </Dialog>

      <Dialog
        open={scriptDialogOpen}
        onClose={() =>
          setScriptDialogOpen(
            false
          )
        }
        fullWidth
        maxWidth="md"
      >

        <DialogTitle>

          {editingScript
            ? "Editar Script"
            : "Nuevo Script"}

        </DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            margin="normal"
            label="Nombre"
            value={scriptNombre}
            onChange={(e) =>
              setScriptNombre(
                e.target.value
              )
            }
          />

          <FormControl
            fullWidth
            margin="normal"
          >

            <InputLabel>
              Tipo
            </InputLabel>

            <Select
              value={scriptTipo}
              label="Tipo"
              onChange={(e) =>
                setScriptTipo(
                  e.target.value
                )
              }
            >

              <MenuItem value="powershell">
                PowerShell
              </MenuItem>

              <MenuItem value="bash">
                Bash
              </MenuItem>

            </Select>

          </FormControl>

          <FormControl
            fullWidth
            margin="normal"
          >

            <InputLabel>
              Sistema Operativo
            </InputLabel>

            <Select
              value={scriptSO}
              label="Sistema Operativo"
              onChange={(e) =>
                setScriptSO(
                  e.target.value
                )
              }
            >

              <MenuItem value="windows">
                Windows
              </MenuItem>

              <MenuItem value="linux">
                Linux
              </MenuItem>

            </Select>

          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Comando"
            value={scriptComando}
            onChange={(e) =>
              setScriptComando(
                e.target.value
              )
            }
          />
          <Box mt={2}>

            <Button
              variant="outlined"
              component="label"
            >

              Seleccionar Script

              <input
                hidden
                type="file"
                onChange={(e) =>
                  setScriptFile(
                    e.target.files[0]
                  )
                }
              />

            </Button>

            {scriptFile && (

              <Typography
                variant="body2"
                sx={{ mt: 1 }}
              >
                {scriptFile.name}
              </Typography>

            )}

          </Box>
        </DialogContent>

        <DialogActions>

          <Button
            onClick={() =>
              setScriptDialogOpen(
                false
              )
            }
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={
              handleSaveScript
            }
          >
            Guardar
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
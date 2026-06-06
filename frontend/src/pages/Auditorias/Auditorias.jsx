import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Radio,
  IconButton,
  Tooltip
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import {
  getAuditorias,
  deleteAuditoria
} from "../../services/auditoria.service";

import {
  ejecutarAuditoria
} from "../../services/auditExecutor.service";

export default function Auditorias() {

  const navigate = useNavigate();

  const [auditorias, setAuditorias] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedAuditoria,
    setSelectedAuditoria] =
    useState(null);

  useEffect(() => {
    loadAuditorias();
  }, []);

  const loadAuditorias = async () => {

    try {

      setLoading(true);

      const data =
        await getAuditorias();

      setAuditorias(data || []);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "¿Eliminar auditoría?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteAuditoria(id);

        await loadAuditorias();

      } catch (error) {

        console.error(error);

        alert(
          "Error eliminando auditoría"
        );
      }
    };

  const handleExecute =
    async () => {

      if (!selectedAuditoria) {

        alert(
          "Seleccione una auditoría"
        );

        return;
      }

      try {

        setLoading(true);

        const resultado =
          await ejecutarAuditoria(
            selectedAuditoria
          );

        console.log(
          "Resultado auditoría:",
          resultado
        );

        alert(
          "Auditoría ejecutada correctamente"
        );

        navigate(
          `/auditorias/${selectedAuditoria}`
        );

      } catch (error) {

        console.error(error);

        alert(
          "Error ejecutando auditoría"
        );

      } finally {

        setLoading(false);
      }
    };

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

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >

        <Typography variant="h4">

          Auditorías

        </Typography>

        <Stack
          direction="row"
          spacing={2}
        >

          <Button
            variant="contained"
            onClick={() =>
              navigate(
                "/auditorias/crear"
              )
            }
          >
            Nueva Auditoría
          </Button>

          <Button
            variant="contained"
            color="success"
            startIcon={
              <PlayArrowIcon />
            }
            onClick={
              handleExecute
            }
          >
            Ejecutar Auditoría
          </Button>

        </Stack>

      </Stack>

      <Paper>

        <TableContainer>

          <Table>

            <TableHead>

              <TableRow>

                <TableCell />

                <TableCell>
                  ID
                </TableCell>

                <TableCell>
                  Empresa
                </TableCell>

                <TableCell>
                  Marco
                </TableCell>

                <TableCell>
                  Auditor
                </TableCell>

                <TableCell>
                  Fecha
                </TableCell>

                <TableCell>
                  Acciones
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {auditorias.length === 0 ? (

                <TableRow>

                  <TableCell
                    colSpan={7}
                    align="center"
                  >

                    No existen auditorías

                  </TableCell>

                </TableRow>

              ) : (

                auditorias.map(
                  (auditoria) => (

                    <TableRow
                      key={
                        auditoria.id_auditoria
                      }
                      hover
                    >

                      <TableCell>

                        <Radio
                          checked={
                            selectedAuditoria ===
                            auditoria.id_auditoria
                          }
                          onChange={() =>
                            setSelectedAuditoria(
                              auditoria.id_auditoria
                            )
                          }
                        />

                      </TableCell>

                      <TableCell>
                        {
                          auditoria.id_auditoria
                        }
                      </TableCell>

                      <TableCell>
                        {
                          auditoria
                            .Empresas?.[0]
                            ?.nombre ||
                          "-"
                        }
                      </TableCell>

                      <TableCell>
                        {
                          auditoria
                            .Marcos?.[0]
                            ?.nombre ||
                          "-"
                        }
                      </TableCell>

                      <TableCell>

                        {
                          auditoria
                            .Users?.[0]
                            ?.nombre
                        }{" "}

                        {
                          auditoria
                            .Users?.[0]
                            ?.apellido
                        }

                      </TableCell>

                      <TableCell>

                        {
                          auditoria.fecha
                            ?.split("T")[0]
                        }

                      </TableCell>

                      <TableCell>

                        <Tooltip
                          title="Ver detalle"
                        >

                          <IconButton
                            color="primary"
                            onClick={() =>
                              navigate(
                                `/auditorias/${auditoria.id_auditoria}`
                              )
                            }
                          >

                            <VisibilityIcon />

                          </IconButton>

                        </Tooltip>

                        <Tooltip
                          title="Eliminar"
                        >

                          <IconButton
                            color="error"
                            onClick={() =>
                              handleDelete(
                                auditoria.id_auditoria
                              )
                            }
                          >

                            <DeleteIcon />

                          </IconButton>

                        </Tooltip>

                      </TableCell>

                    </TableRow>
                  )
                )
              )}

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>

    </Box>
  );
}
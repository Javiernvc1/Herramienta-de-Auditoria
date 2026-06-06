import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Stack
} from "@mui/material";

import {
  getAuditoriaById
} from "../../services/auditoria.service";

import {
  getResultados
} from "../../services/resultado.service";

export default function DetalleAuditoria() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [auditoria, setAuditoria] =
    useState(null);

  const [resultados, setResultados] =
    useState([]);

  useEffect(() => {

    loadData();

  }, [id]);

  const loadData = async () => {

    try {

      setLoading(true);

      const auditoriaData =
        await getAuditoriaById(id);

      const resultadosData =
        await getResultados();

      const resultadosFiltrados =
        resultadosData.filter(
          (resultado) =>
            resultado.Auditoria?.some(
              (a) =>
                a.id_auditoria ===
                Number(id)
            )
        );

      setAuditoria(auditoriaData);

      setResultados(
        resultadosFiltrados
      );

    } catch (error) {

      console.error(error);

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

  if (!auditoria) {

    return (
      <Typography>
        Auditoría no encontrada
      </Typography>
    );
  }

  return (
    <Box p={3}>

      <Stack
        direction="row"
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h4">

          Detalle Auditoría

        </Typography>

        <Button
          variant="outlined"
          onClick={() =>
            navigate("/auditorias")
          }
        >
          Volver
        </Button>
      </Stack>

      <Paper sx={{ p: 3, mb: 3 }}>

        <Typography
          variant="h6"
          gutterBottom
        >
          Información General
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>

          <Grid item xs={12} md={6}>
            <Typography>

              <strong>Empresa:</strong>{" "}

              {
                auditoria.Empresas?.[0]
                  ?.nombre
              }

            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>

              <strong>Marco:</strong>{" "}

              {
                auditoria.Marcos?.[0]
                  ?.nombre
              }

            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>

              <strong>Auditor:</strong>{" "}

              {
                auditoria.Users?.[0]
                  ?.nombre
              }{" "}
              {
                auditoria.Users?.[0]
                  ?.apellido
              }

            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>

              <strong>Correo:</strong>{" "}

              {
                auditoria.Users?.[0]
                  ?.email
              }

            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography>

              <strong>Fecha:</strong>{" "}

              {
                auditoria.fecha
                  ?.split("T")[0]
              }

            </Typography>
          </Grid>

        </Grid>

      </Paper>

      <Paper sx={{ p: 3 }}>

        <Typography
          variant="h6"
          gutterBottom
        >
          Historial de Ejecuciones
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <TableContainer>

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>
                  ID Resultado
                </TableCell>

                <TableCell>
                  Fecha Ejecución
                </TableCell>

                <TableCell>
                  Equipos
                </TableCell>

                <TableCell>
                  Acción
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {resultados.length === 0 ? (

                <TableRow>

                  <TableCell
                    colSpan={4}
                    align="center"
                  >
                    No existen ejecuciones
                  </TableCell>

                </TableRow>

              ) : (

                resultados.map(
                  (resultado) => (

                    <TableRow
                      key={
                        resultado.id_resultado
                      }
                    >

                      <TableCell>
                        {
                          resultado.id_resultado
                        }
                      </TableCell>

                      <TableCell>

                        {
                          resultado.fecha_ejecucion
                            ?.replace(
                              "T",
                              " "
                            )
                            .substring(
                              0,
                              19
                            )
                        }

                      </TableCell>

                      <TableCell>

                        {
                          resultado.Equipos
                            ?.length
                        }

                      </TableCell>

                      <TableCell>

                        <Button
                          variant="contained"
                          size="small"
                          onClick={() =>
                            navigate(
                              `/resultados/${resultado.id_resultado}`
                            )
                          }
                        >
                          Ver Resultado
                        </Button>

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
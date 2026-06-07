import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Grid,
  Card,
  CardContent,
  Button
} from "@mui/material";

import PictureAsPdfIcon
  from "@mui/icons-material/PictureAsPdf";

import {
  getResultadoById
} from "../../services/resultado.service";

import {
  getResultadosControl
} from "../../services/resultadoControl.service";

import {
  generarPDF
} from "../../services/reportpdf.service";

export default function ResultadoDetalle() {

  const { id } = useParams();

  const [resultado, setResultado] =
    useState(null);

  const [controles, setControles] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {

    try {

      const resultadoData =
        await getResultadoById(id);

      const controlesData =
        await getResultadosControl();

      const controlesResultado =
        controlesData.filter(
          (control) =>
            control.Resultados?.some(
              (r) =>
                r.id_resultado ===
                Number(id)
            )
        );

      setResultado(resultadoData);

      setControles(controlesResultado);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  const getEstadoColor = (estado) => {

    switch (estado) {

      case "CUMPLE":
        return "success";

      case "NO CUMPLE":
        return "error";

      case "INFORMATIVO":
        return "info";

      default:
        return "default";
    }
  };

  const getEquipoControl = (control) => {

    if (
      control.Equipos &&
      control.Equipos.length > 0
    ) {

      return control.Equipos[0];
    }

    if (
      resultado?.Equipos &&
      resultado.Equipos.length === 1
    ) {

      return resultado.Equipos[0];
    }

    return null;
  };

  // ==========================
  // MÉTRICAS GENERALES
  // ==========================

  const totalControles =
    controles.length;

  const cumple =
    controles.filter(
      (c) => c.estado === "CUMPLE"
    ).length;

  const noCumple =
    controles.filter(
      (c) => c.estado === "NO CUMPLE"
    ).length;

  const informativo =
    controles.filter(
      (c) => c.estado === "INFORMATIVO"
    ).length;

  const porcentajeCumplimiento =
    totalControles > 0
      ? (
        (cumple / totalControles) *
        100
      ).toFixed(1)
      : 0;

  // ==========================
  // MÉTRICAS POR EQUIPO
  // ==========================

  const resumenEquipos =
    controles.reduce(
      (acc, control) => {

        const equipo =
          getEquipoControl(control);

        const key =
          equipo?.id_equipo ||
          "sin_equipo";

        if (!acc[key]) {

          acc[key] = {
            id_equipo:
              equipo?.id_equipo || null,

            hostname:
              equipo?.hostname || "Sin equipo",

            ip:
              equipo?.ip || "-",

            nombreOS:
              equipo?.nombreOS || "-",

            total: 0,

            cumple: 0,

            noCumple: 0,

            informativo: 0
          };
        }

        acc[key].total += 1;

        if (control.estado === "CUMPLE") {
          acc[key].cumple += 1;
        }

        if (control.estado === "NO CUMPLE") {
          acc[key].noCumple += 1;
        }

        if (control.estado === "INFORMATIVO") {
          acc[key].informativo += 1;
        }

        return acc;
      },
      {}
    );

  const resumenEquiposArray =
    Object.values(resumenEquipos);

  const handleGenerarPDF = async () => {

    const auditoriaId =
      resultado?.Auditoria?.[0]
        ?.id_auditoria;

    if (!auditoriaId) {

      alert(
        "No se encontró la auditoría asociada"
      );

      return;
    }

    const ok =
      await generarPDF(auditoriaId);

    if (!ok) {

      alert(
        "Error generando PDF"
      );
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

  if (!resultado) {

    return (
      <Typography>
        Resultado no encontrado
      </Typography>
    );
  }

  return (

    <Box p={3}>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >

        <Typography variant="h4">
          Resultado #{resultado.id_resultado}
        </Typography>
        <br />
        <Typography color="text.secondary">
          Detalle de ejecución, métricas y controles evaluados.
          <br /><br />
        </Typography>
        <Button
          variant="contained"
          color="error"
          startIcon={<PictureAsPdfIcon />}
          onClick={handleGenerarPDF}
        >
          Descargar Informe PDF
        </Button>
        <br /><br />
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>

        <Grid container spacing={2}>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">
              Fecha ejecución
            </Typography>

            <Typography>
              {new Date(
                resultado.fecha_ejecucion
              ).toLocaleString()}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">
              Auditoría Nro
            </Typography>

            <Typography>
              {
                resultado.Auditoria?.[0]
                  ?.id_auditoria ??
                "Sin auditoría"
              }
            </Typography>
          </Grid>

        </Grid>

      </Paper>

      {/* MÉTRICAS GENERALES */}

      <Grid
        container
        spacing={2}
        sx={{ mb: 3 }}
      >

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4">
                {totalControles}
              </Typography>

              <Typography color="text.secondary">
                Total Controles
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography
                variant="h4"
                color="success.main"
              >
                {cumple}
              </Typography>

              <Typography color="text.secondary">
                Cumple
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography
                variant="h4"
                color="error.main"
              >
                {noCumple}
              </Typography>

              <Typography color="text.secondary">
                No Cumple
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography
                variant="h4"
                color="info.main"
              >
                {informativo}
              </Typography>

              <Typography color="text.secondary">
                Informativos
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>

        <Typography
          variant="h6"
          gutterBottom
        >
          Cumplimiento General
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography
          variant="h2"
          color="primary"
          align="center"
        >
          {porcentajeCumplimiento}%
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
        >
          Controles cumplidos respecto al total evaluado
        </Typography>

      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>

        <Typography
          variant="h6"
          gutterBottom
        >
          Equipos auditados
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {resultado.Equipos?.length > 0 ? (

          resultado.Equipos.map(
            (equipo) => (

              <Box
                key={equipo.id_equipo}
                mb={2}
              >

                <Typography>
                  <strong>Hostname:</strong>{" "}
                  {equipo.hostname}
                </Typography>

                <Typography>
                  <strong>IP:</strong>{" "}
                  {equipo.ip}
                </Typography>

                <Typography>
                  <strong>Sistema:</strong>{" "}
                  {equipo.nombreOS}
                </Typography>

              </Box>
            )
          )

        ) : (

          <Typography>
            Sin equipos asociados
          </Typography>
        )}

      </Paper>

      {/* RESUMEN POR EQUIPO */}

      <Paper sx={{ p: 3, mb: 3 }}>

        <Typography
          variant="h6"
          gutterBottom
        >
          Resumen por equipo
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <TableContainer>

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>
                  Equipo
                </TableCell>

                <TableCell>
                  IP
                </TableCell>

                <TableCell>
                  Sistema
                </TableCell>

                <TableCell>
                  Total
                </TableCell>

                <TableCell>
                  Cumple
                </TableCell>

                <TableCell>
                  No Cumple
                </TableCell>

                <TableCell>
                  Informativos
                </TableCell>

                <TableCell>
                  Cumplimiento
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {resumenEquiposArray.length === 0 ? (

                <TableRow>
                  <TableCell
                    colSpan={8}
                    align="center"
                  >
                    No existen controles asociados a equipos
                  </TableCell>
                </TableRow>

              ) : (

                resumenEquiposArray.map(
                  (equipo) => {

                    const porcentaje =
                      equipo.total > 0
                        ? (
                          (equipo.cumple /
                            equipo.total) *
                          100
                        ).toFixed(1)
                        : 0;

                    return (

                      <TableRow
                        key={
                          equipo.id_equipo ||
                          equipo.hostname
                        }
                      >

                        <TableCell>
                          {equipo.hostname}
                        </TableCell>

                        <TableCell>
                          {equipo.ip}
                        </TableCell>

                        <TableCell>
                          {equipo.nombreOS}
                        </TableCell>

                        <TableCell>
                          {equipo.total}
                        </TableCell>

                        <TableCell>
                          {equipo.cumple}
                        </TableCell>

                        <TableCell>
                          {equipo.noCumple}
                        </TableCell>

                        <TableCell>
                          {equipo.informativo}
                        </TableCell>

                        <TableCell>
                          {porcentaje}%
                        </TableCell>

                      </TableRow>
                    );
                  }
                )
              )}

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>

      <Paper sx={{ p: 3 }}>

        <Typography
          variant="h6"
          gutterBottom
        >
          Resultados de controles
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <TableContainer>

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>
                  Equipo
                </TableCell>

                <TableCell>
                  Parámetro
                </TableCell>

                <TableCell>
                  Valor esperado
                </TableCell>

                <TableCell>
                  Valor obtenido
                </TableCell>

                <TableCell>
                  Estado
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {controles.length === 0 ? (

                <TableRow>

                  <TableCell
                    colSpan={5}
                    align="center"
                  >
                    No existen resultados de controles
                  </TableCell>

                </TableRow>

              ) : (

                controles.map(
                  (control) => {

                    const equipo =
                      getEquipoControl(control);

                    return (

                      <TableRow
                        key={
                          control.id_resultado_control
                        }
                      >

                        <TableCell>
                          {
                            equipo
                              ? `${equipo.hostname} (${equipo.ip})`
                              : "Sin equipo"
                          }
                        </TableCell>

                        <TableCell>
                          {
                            control.Parametros?.[0]
                              ?.nombre || "-"
                          }
                        </TableCell>

                        <TableCell>
                          {
                            control.Parametros?.[0]
                              ?.valor_esperado || "-"
                          }
                        </TableCell>

                        <TableCell
                          sx={{
                            maxWidth: 450,
                            whiteSpace: "normal",
                            wordBreak: "break-word"
                          }}
                        >
                          {control.valor_obtenido}
                        </TableCell>

                        <TableCell>

                          <Chip
                            label={control.estado}
                            color={getEstadoColor(
                              control.estado
                            )}
                          />

                        </TableCell>

                      </TableRow>
                    );
                  }
                )
              )}

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>

    </Box>
  );
}
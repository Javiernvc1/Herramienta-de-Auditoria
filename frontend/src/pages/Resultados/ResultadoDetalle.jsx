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

import { generarPDF }
    from "../../services/reportpdf.service";

export default function ResultadoDetalle() {

    const { id } = useParams();

    const [resultado, setResultado] = useState(null);
    const [controles, setControles] = useState([]);
    const [loading, setLoading] = useState(true);

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
                controlesData.filter(control =>
                    control.Resultados?.some(
                        r => r.id_resultado === Number(id)
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

    // ==========================
    // MÉTRICAS
    // ==========================

    const totalControles =
        controles.length;

    const cumple =
        controles.filter(
            c => c.estado === "CUMPLE"
        ).length;

    const noCumple =
        controles.filter(
            c => c.estado === "NO CUMPLE"
        ).length;

    const informativo =
        controles.filter(
            c => c.estado === "INFORMATIVO"
        ).length;

    const porcentajeCumplimiento =
        totalControles > 0
            ? (
                (cumple / totalControles) * 100
            ).toFixed(1)
            : 0;

    const handleGenerarPDF = async () => {

        const auditoriaId =
            resultado?.Auditoria?.[0]?.id_auditoria;

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

    return (<Box p={3}>


        <Typography
            variant="h4"
            gutterBottom
        >
            Resultado #{resultado.id_resultado}
        </Typography>

        <Button
            variant="contained"
            color="error"
            startIcon={<PictureAsPdfIcon />}
            onClick={handleGenerarPDF}
            sx={{ mb: 3 }}
        >
            Descargar Informe PDF
        </Button>
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
                        {resultado.Auditoria?.[0]?.id_auditoria ??
                            "Sin auditoría"}
                    </Typography>
                </Grid>

            </Grid>

        </Paper>

        {/* MÉTRICAS */}

        <Grid container spacing={2} sx={{ mb: 3 }}>

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

                resultado.Equipos.map(equipo => (

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

                ))

            ) : (

                <Typography>
                    Sin equipos asociados
                </Typography>

            )}

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

                        {controles.map(control => (

                            <TableRow
                                key={
                                    control.id_resultado_control
                                }
                            >

                                <TableCell>
                                    {
                                        control.Parametros?.[0]
                                            ?.nombre
                                    }
                                </TableCell>

                                <TableCell>
                                    {
                                        control.Parametros?.[0]
                                            ?.valor_esperado
                                    }
                                </TableCell>

                                <TableCell>
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

                        ))}

                    </TableBody>

                </Table>

            </TableContainer>

        </Paper>

    </Box>


    );
}

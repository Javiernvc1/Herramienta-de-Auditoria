import { useEffect, useState } from "react";

import {
Grid,
Card,
CardContent,
Typography,
Paper,
Table,
TableBody,
TableCell,
TableContainer,
TableHead,
TableRow,
CircularProgress
} from "@mui/material";

import {getDashboardData} from "../../services/dashboard.service";

export default function Dashboard() {

const [
dashboardData,
setDashboardData
] = useState(null);

const [
loading,
setLoading
] = useState(true);

useEffect(() => {


const loadDashboard =
  async () => {

    try {

      const data =
        await getDashboardData();

      setDashboardData(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

loadDashboard();


}, []);

if (loading) {

return (
  <CircularProgress />
);


}

return (


<>

  <Typography
    variant="h4"
    sx={{ mb: 3 }}
  >
    Dashboard
  </Typography>

  <Grid
    container
    spacing={3}
  >

    <Grid item xs={12} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6">
            Auditorías
          </Typography>

          <Typography variant="h4">
            {
              dashboardData.metricas
                .totalAuditorias
            }
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6">
            Empresas
          </Typography>

          <Typography variant="h4">
            {
              dashboardData.metricas
                .totalEmpresas
            }
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6">
            Equipos
          </Typography>

          <Typography variant="h4">
            {
              dashboardData.metricas
                .totalEquipos
            }
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6">
            Marcos
          </Typography>

          <Typography variant="h4">
            {
              dashboardData.metricas
                .totalMarcos
            }
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6">
            Usuarios
          </Typography>

          <Typography variant="h4">
            {
              dashboardData.metricas
                .totalUsuarios
            }
          </Typography>
        </CardContent>
      </Card>
    </Grid>

  </Grid>

  <Paper sx={{ mt: 4 }}>

    <TableContainer>

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>
              ID
            </TableCell>

            <TableCell>
              Fecha
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

          </TableRow>

        </TableHead>

        <TableBody>

          {
            dashboardData
              .auditoriasRecientes
              .map(
                (auditoria) => (

                <TableRow
                  key={
                    auditoria.id_auditoria
                  }
                >

                  <TableCell>
                    {
                      auditoria.id_auditoria
                    }
                  </TableCell>

                  <TableCell>
                    {
                      new Date(
                        auditoria.fecha
                      ).toLocaleDateString(
                        "es-CL"
                      )
                    }
                  </TableCell>

                  <TableCell>
                    {
                      auditoria.Empresas?.[0]
                        ?.nombre || "-"
                    }
                  </TableCell>

                  <TableCell>
                    {
                      auditoria.Marcos?.[0]
                        ?.nombre || "-"
                    }
                  </TableCell>

                  <TableCell>
                    {
                      auditoria.Users?.[0]
                        ?.nombre || "-"
                    }
                  </TableCell>

                </TableRow>

              ))
          }

        </TableBody>

      </Table>

    </TableContainer>

  </Paper>

</>


);
}

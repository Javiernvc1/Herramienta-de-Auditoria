import { useEffect, useState } from "react";

import {
  Box,
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
  CircularProgress,
  Divider,
  Stack
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import BusinessIcon from "@mui/icons-material/Business";
import ComputerIcon from "@mui/icons-material/Computer";
import ShieldIcon from "@mui/icons-material/Shield";
import PeopleIcon from "@mui/icons-material/People";

import {
  getDashboardData
} from "../../services/dashboard.service";

export default function Dashboard() {

  const [dashboardData, setDashboardData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const loadDashboard = async () => {

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
      <Box
        display="flex"
        justifyContent="center"
        mt={5}
      >
        <CircularProgress />
      </Box>
    );
  }

  const metricas = [
    {
      label: "Auditorías",
      value: dashboardData.metricas.totalAuditorias,
      icon: <AssignmentIcon />,
      color: "primary.main"
    },
    {
      label: "Empresas",
      value: dashboardData.metricas.totalEmpresas,
      icon: <BusinessIcon />,
      color: "secondary.main"
    },
    {
      label: "Equipos",
      value: dashboardData.metricas.totalEquipos,
      icon: <ComputerIcon />,
      color: "success.main"
    },
    {
      label: "Marcos",
      value: dashboardData.metricas.totalMarcos,
      icon: <ShieldIcon />,
      color: "warning.main"
    },
    {
      label: "Usuarios",
      value: dashboardData.metricas.totalUsuarios,
      icon: <PeopleIcon />,
      color: "info.main"
    }
  ];

  return (

    <Box
      p={4}
      sx={{
        maxWidth: 1200
      }}
    >

      <Box mb={4}>
        <Stack spacing={2}>
        <Typography
          variant="h4"
          fontWeight={700}
          mb={1}
        >
          Dashboard
        </Typography>
        
        <Typography color="text.secondary">
          Resumen general del sistema de auditoría.
        </Typography>
        </Stack>
      </Box>
      <br /><br />
      <Grid
        container
        spacing={3}
        mb={4}
      >

        {metricas.map((item) => (

          <Grid
            item
            xs={12}
            sm={6}
            md={2.4}
            key={item.label}
          >

            <Card
              sx={{
                borderRadius: 2,
                height: "100%"
              }}
            >

              <CardContent>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >

                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    fontWeight={600}
                  >
                    {item.label}
                  </Typography>

                  <Box
                    sx={{
                      color: item.color,
                      display: "flex"
                    }}
                  >
                    {item.icon}
                  </Box>

                </Box>

                <Typography
                  variant="h3"
                  fontWeight={700}
                >
                  {item.value}
                </Typography>

              </CardContent>

            </Card>

          </Grid>
        ))}

      </Grid>
<br /><br />
      <Paper
        sx={{
          borderRadius: 2,
          overflow: "hidden"
        }}
      >
        
        <Box p={3}>

          <Typography
            variant="h5"
            fontWeight={600}
          >
            Auditorías recientes
          </Typography>

          <Typography color="text.secondary">
            Últimas auditorías registradas en el sistema.
          </Typography>

        </Box>

        <Divider />

        <TableContainer>

          <Table>

            <TableHead>

              <TableRow
                sx={{
                  backgroundColor: "grey.100"
                }}
              >

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

              {dashboardData.auditoriasRecientes?.length > 0 ? (

                dashboardData.auditoriasRecientes.map(
                  (auditoria) => (

                    <TableRow
                      key={auditoria.id_auditoria}
                      hover
                    >

                      <TableCell>
                        #{auditoria.id_auditoria}
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
                  )
                )

              ) : (

                <TableRow>

                  <TableCell
                    colSpan={5}
                    align="center"
                  >
                    No hay auditorías recientes
                  </TableCell>

                </TableRow>
              )}

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>

    </Box>
  );
}
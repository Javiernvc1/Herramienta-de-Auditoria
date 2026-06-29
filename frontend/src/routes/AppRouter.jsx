import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import ProtectedRoute
  from "./ProtectedRoute";

import DashboardLayout
  from "../layouts/DashboardLayout";

// Login
import Login
  from "../pages/Login/Login";

// Dashboard
import Dashboard
  from "../pages/Dashboard/Dashboard";

// Auditorías
import Auditorias
  from "../pages/Auditorias/Auditorias";

import CrearAuditoria
  from "../pages/Auditorias/CrearAuditoria";

import DetalleAuditoria
  from "../pages/Auditorias/DetalleAuditoria";

// Empresas
import Empresas
  from "../pages/Empresas/Empresas";

// Usuarios
import Usuarios
  from "../pages/Usuarios/Usuarios";

// Marcos
import Marcos
  from "../pages/Marcos/Marcos";

// Controles
import Controles
  from "../pages/Controles/Controles";

// Parámetros
import Parametros
  from "../pages/Parametros/Parametros";

// Scripts
import Scripts
  from "../pages/Scripts/Scripts";

// Reportes
import Reportes
  from "../pages/Reportes/Reportes";

// Resultados
import ResultadoDetalle
  from "../pages/Resultados/ResultadoDetalle";

export default function AppRouter() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* DASHBOARD */}

        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "AUDITOR"]}>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* AUDITORIAS */}

        <Route
          path="/auditorias"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "AUDITOR"]}>
              <DashboardLayout>
                <Auditorias />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/auditorias/crear"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "AUDITOR"]}>
              <DashboardLayout>
                <CrearAuditoria />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/auditorias/:id"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "AUDITOR"]}>
              <DashboardLayout>
                <DetalleAuditoria />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* EMPRESAS */}

        <Route
          path="/empresas"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "AUDITOR"]}>
              <DashboardLayout>
                <Empresas />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />


        {/* USUARIOS */}
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <DashboardLayout>
                <Usuarios />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* MARCOS */}

        <Route
          path="/marcos"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <DashboardLayout>
                <Marcos />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* CONTROLES */}

        <Route
          path="/controles"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <DashboardLayout>
                <Controles />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />


        {/* RESULTADOS */}

        <Route
          path="/resultados/:id"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "AUDITOR"]}>
              <DashboardLayout>
                <ResultadoDetalle />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>

    </BrowserRouter>
  );
}
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
            <ProtectedRoute>
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
            <ProtectedRoute>
              <DashboardLayout>
                <Auditorias />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/auditorias/crear"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CrearAuditoria />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/auditorias/:id"
          element={
            <ProtectedRoute>
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
            <ProtectedRoute>
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
            <ProtectedRoute>
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
            <ProtectedRoute>
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
            <ProtectedRoute>
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
            <ProtectedRoute>
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
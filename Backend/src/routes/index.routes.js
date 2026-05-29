"use strict";

// Importa el modulo 'express'
const express = require("express");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Rutas */
const authRoutes = require("./auth.routes.js");
const userRoutes = require("./user.routes.js");
const empresaRoutes = require("./empresa.routes.js");
const equipoRoutes = require("./equipo.routes.js");
const marcoRoutes = require("./marco.routes.js");
const controlRoutes = require("./control.routes.js");
const parametroRoutes = require("./parametro.routes.js");
const scriptRoutes = require("./script.routes.js");
const auditoriaRoutes = require("./auditoria.routes.js");
const resultadoControlRoutes = require("./resultadoControl.routes.js");
const executorRoutes = require("./executor.routes.js");
const auditExecutorRoutes = require("./auditExecutor.routes");
/** Instancia del router */
const router = express.Router();

/**
 * 
 * Rutas públicas
 * 
 */

// Auth
router.use("/auth", authRoutes);

/**
 * 
 * Rutas protegidas
 * 
 */

// Usuarios
router.use("/users", authenticationMiddleware, userRoutes);

// Empresas
router.use("/empresas", authenticationMiddleware, empresaRoutes);

// Equipos
router.use("/equipos", authenticationMiddleware, equipoRoutes);

// Marcos
router.use("/marcos", authenticationMiddleware, marcoRoutes);

// Controles
router.use("/controles", authenticationMiddleware, controlRoutes);

// Parámetros
router.use("/parametros", authenticationMiddleware, parametroRoutes);

// Scripts
router.use("/scripts", authenticationMiddleware, scriptRoutes);

// Auditorías
router.use("/auditorias", authenticationMiddleware, auditoriaRoutes);

// Resultados de control
router.use("/resultados-control", authenticationMiddleware, resultadoControlRoutes);


// Ejecutor de scripts
router.use("/executor", authenticationMiddleware, executorRoutes);

// Ejecutor de auditorías
router.use("/audit-executor", authenticationMiddleware, auditExecutorRoutes);

module.exports = router;

"use strict";

const express = require("express");

const router = express.Router();

const equipoController = require("../controllers/equipo.controller");

const verifyJWT = require("../middlewares/authentication.middleware");
const verifyRole = require("../middlewares/authorization.middleware");

// Obtener todos los equipos
router.get(
  "/",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  equipoController.getEquipos
);

// Obtener equipo por ID
router.get(
  "/:id",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  equipoController.getEquipoById
);

// Crear equipo
router.post(
  "/",
  verifyJWT,
  verifyRole("ADMIN"),
  equipoController.createEquipo
);

// Actualizar equipo
router.put(
  "/:id",
  verifyJWT,
  verifyRole("ADMIN"),
  equipoController.updateEquipo
);

// Eliminar equipo
router.delete(
  "/:id",
  verifyJWT,
  verifyRole("ADMIN"),
  equipoController.deleteEquipo
);

router.post(
  "/:idEquipo/empresa/:idEmpresa",
  equipoController.assignEmpresa
);

router.delete(
  "/:idEquipo/empresa/:idEmpresa",
  equipoController.removeEmpresa
);

module.exports = router;
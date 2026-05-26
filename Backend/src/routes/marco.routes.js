"use strict";

const express = require("express");

const router = express.Router();

const marcoController = require("../controllers/marco.controller");

const verifyJWT = require("../middlewares/authentication.middleware");
const verifyRole = require("../middlewares/authorization.middleware");

// Obtener todos los marcos
router.get(
  "/",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  marcoController.getMarcos
);

// Obtener marco por ID
router.get(
  "/:id",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  marcoController.getMarcoById
);

// Crear marco
router.post(
  "/",
  verifyJWT,
  verifyRole("ADMIN"),
  marcoController.createMarco
);

// Actualizar marco
router.put(
  "/:id",
  verifyJWT,
  verifyRole("ADMIN"),
  marcoController.updateMarco
);

// Eliminar marco
router.delete(
  "/:id",
  verifyJWT,
  verifyRole("ADMIN"),
  marcoController.deleteMarco
);

module.exports = router;
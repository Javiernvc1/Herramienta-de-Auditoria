"use strict";

const express = require("express");

const router = express.Router();

const auditoriaController = require("../controllers/auditoria.controller");

const verifyJWT = require("../middlewares/authentication.middleware");
const verifyRole = require("../middlewares/authorization.middleware");

// Obtener auditorías
router.get(
  "/",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  auditoriaController.getAuditorias
);

// Obtener auditoría por ID
router.get(
  "/:id",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  auditoriaController.getAuditoriaById
);

// Crear auditoría
router.post(
  "/",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  auditoriaController.createAuditoria
);

// Actualizar auditoría
router.put(
  "/:id",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  auditoriaController.updateAuditoria
);

// Eliminar auditoría
router.delete(
  "/:id",
  verifyJWT,
  verifyRole("ADMIN"),
  auditoriaController.deleteAuditoria
);

module.exports = router;
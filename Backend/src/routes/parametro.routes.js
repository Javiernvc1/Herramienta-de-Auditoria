"use strict";

const express = require("express");

const router = express.Router();

const parametroController = require("../controllers/parametro.controller");

const verifyJWT = require("../middlewares/authentication.middleware");
const verifyRole = require("../middlewares/authorization.middleware");

// Obtener todos los parámetros
router.get(
  "/",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  parametroController.getParametros
);

// Obtener parámetro por ID
router.get(
  "/:id",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  parametroController.getParametroById
);

// Crear parámetro
router.post(
  "/",
  verifyJWT,
  verifyRole("ADMIN"),
  parametroController.createParametro
);

// Actualizar parámetro
router.put(
  "/:id",
  verifyJWT,
  verifyRole("ADMIN"),
  parametroController.updateParametro
);

// Eliminar parámetro
router.delete(
  "/:id",
  verifyJWT,
  verifyRole("ADMIN"),
  parametroController.deleteParametro
);

router.post(
  "/:id/controles/:controlId",
  parametroController.assignControl
);

router.delete(
  "/:id/controles/:controlId",
  parametroController.removeControl
);

module.exports = router;
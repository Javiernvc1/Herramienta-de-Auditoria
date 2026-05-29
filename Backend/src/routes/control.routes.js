"use strict";

const express = require("express");

const router = express.Router();

const controlController = require("../controllers/control.controller");

const verifyJWT = require("../middlewares/authentication.middleware");
const verifyRole = require("../middlewares/authorization.middleware");

// Obtener todos los controles
router.get(
  "/",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  controlController.getControles
);

// Obtener control por ID
router.get(
  "/:id",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  controlController.getControlById
);

// Crear control
router.post(
  "/",
  verifyJWT,
  verifyRole("ADMIN"),
  controlController.createControl
);

// Actualizar control
router.put(
  "/:id",
  verifyJWT,
  verifyRole("ADMIN"),
  controlController.updateControl
);

// Eliminar control
router.delete(
  "/:id",
  verifyJWT,
  verifyRole("ADMIN"),
  controlController.deleteControl
);

router.post(
  "/:id/marcos/:marcoId",
  controlController.assignMarco
);

router.delete(
  "/:id/marcos/:marcoId",
  controlController.removeMarco
);

module.exports = router;
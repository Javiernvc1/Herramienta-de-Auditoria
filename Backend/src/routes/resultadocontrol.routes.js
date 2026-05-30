"use strict";

const express = require("express");

const router = express.Router();

const resultadoControlController =
  require("../controllers/resultadocontrol.controller");

const verifyJWT = require("../middlewares/authentication.middleware");
const verifyRole = require("../middlewares/authorization.middleware");

// Obtener todos los resultados de control
router.get(
  "/",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  resultadoControlController.getResultadosControl
);

// Obtener resultado de control por ID
router.get(
  "/:id",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  resultadoControlController.getResultadoControlById
);

// Crear resultado de control
router.post(
  "/",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  resultadoControlController.createResultadoControl
);

// Actualizar resultado de control
router.put(
  "/:id",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  resultadoControlController.updateResultadoControl
);

// Eliminar resultado de control
router.delete(
  "/:id",
  verifyJWT,
  verifyRole("ADMIN"),
  resultadoControlController.deleteResultadoControl
);

// Asociar parámetro
router.post(
  "/:idResultadoControl/parametro/:idParametro",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  resultadoControlController.assignParametro
);

// Desasociar parámetro
router.delete(
  "/:idResultadoControl/parametro/:idParametro",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  resultadoControlController.removeParametro
);

// Asociar resultado
router.post(
  "/:idResultadoControl/resultado/:idResultado",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  resultadoControlController.assignResultado
);

// Desasociar resultado
router.delete(
  "/:idResultadoControl/resultado/:idResultado",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  resultadoControlController.removeResultado
);
module.exports = router;
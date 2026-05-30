"use strict";

const express = require("express");

const resultadoController = require("../controllers/resultado.controller");

const router = express.Router();

router.get("/", resultadoController.getResultados);
router.get("/:id", resultadoController.getResultadoById);

router.post("/", resultadoController.createResultado);

router.put("/:id", resultadoController.updateResultado);

router.delete("/:id", resultadoController.deleteResultado);

// Auditorías
router.post(
  "/:id/auditorias/:auditoriaId",
  resultadoController.assignAuditoria
);

router.delete(
  "/:id/auditorias/:auditoriaId",
  resultadoController.removeAuditoria
);

// Equipos
router.post(
  "/:id/equipos/:equipoId",
  resultadoController.assignEquipo
);

router.delete(
  "/:id/equipos/:equipoId",
  resultadoController.removeEquipo
);

module.exports = router;
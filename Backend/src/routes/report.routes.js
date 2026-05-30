"use strict";

const express = require("express");

const router = express.Router();

const reportController =
  require("../controllers/report.controller");

const verifyJWT =
  require("../middlewares/authentication.middleware");

const verifyRole =
  require("../middlewares/authorization.middleware");

/**
 * Reporte completo de auditoría
 */
router.get(
  "/auditoria/:id",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  reportController.getReporteAuditoria
);

module.exports = router;
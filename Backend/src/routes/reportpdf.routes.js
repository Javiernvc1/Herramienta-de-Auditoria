"use strict";

const express = require("express");

const router = express.Router();

const reportPDFController =
  require("../controllers/reportpdf.controller");

const verifyJWT =
  require("../middlewares/authentication.middleware");

const verifyRole =
  require("../middlewares/authorization.middleware");

/**
 * Generar PDF
 */
router.get("/:id",verifyJWT,verifyRole("ADMIN","AUDITOR"),reportPDFController.generarPDF);

module.exports = router;
"use strict";

const express = require("express");

const router = express.Router();

const auditExecutorController =
  require("../controllers/auditExecutor.controller");

const verifyJWT =
  require("../middlewares/authentication.middleware");

router.post(
  "/:id",
  verifyJWT,
  auditExecutorController.ejecutar
);

module.exports = router;
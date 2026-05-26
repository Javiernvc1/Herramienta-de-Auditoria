"use strict";

const express = require("express");

const router = express.Router();

const ExecutorController =
  require("../controllers/executor.controller");

const verifyJWT =
  require("../middlewares/authentication.middleware");

/**
 * Ejecutar script por ID
 */

router.post(
  "/:id",
  verifyJWT,
  ExecutorController.executeScript
);

module.exports = router;
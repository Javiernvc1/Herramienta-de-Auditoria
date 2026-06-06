"use strict";

const express = require("express");

const router = express.Router();

const scriptController = require("../controllers/script.controller");

const verifyJWT = require("../middlewares/authentication.middleware");
const verifyRole = require("../middlewares/authorization.middleware");

const upload =
  require(
    "../middlewares/upload.middleware"
  );
  
// Obtener todos los scripts
router.get(
  "/",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  scriptController.getScripts
);

// Obtener script por ID
router.get(
  "/:id",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  scriptController.getScriptById
);

// Crear script
router.post(
  "/",
  verifyJWT,
  upload.single("archivo"),
  verifyRole("ADMIN", "AUDITOR"),
  scriptController.createScript
);

// Actualizar script
router.put(
  "/:id",
  verifyJWT,
  upload.single("archivo"),
  verifyRole("ADMIN"),
  scriptController.updateScript
);

// Eliminar script
router.delete(
  "/:id",
  verifyJWT,
  verifyRole("ADMIN"),
  scriptController.deleteScript
);

router.post(
  "/:id/parametros/:parametroId",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  scriptController.assignParametro
);

router.delete(
  "/:id/parametros/:parametroId",
  verifyJWT,
  verifyRole("ADMIN", "AUDITOR"),
  scriptController.removeParametro
);

module.exports = router;
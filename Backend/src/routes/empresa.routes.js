"use strict";

const express = require("express");

const router = express.Router();

const empresaController = require("../controllers/empresa.controller");

const verifyJWT = require("../middlewares/authentication.middleware");
const verifyRole = require("../middlewares/authorization.middleware");

// Obtener todas las empresas
router.get("/",verifyJWT,verifyRole("ADMIN", "AUDITOR"),empresaController.getEmpresas);

// Obtener empresa por ID
router.get("/:id",verifyJWT,verifyRole("ADMIN", "AUDITOR"),empresaController.getEmpresaById);

// Crear empresa
router.post("/",verifyJWT,verifyRole("ADMIN", "AUDITOR"),empresaController.createEmpresa);

// Actualizar empresa
router.put("/:id",verifyJWT,verifyRole("ADMIN", "AUDITOR"),empresaController.updateEmpresa);

// Eliminar empresa
router.delete("/:id",verifyJWT,verifyRole("ADMIN", "AUDITOR"),empresaController.deleteEmpresa);

module.exports = router;
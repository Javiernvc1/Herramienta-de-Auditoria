"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Controlador de usuarios */
const usuarioController = require("../controllers/user.controller.js");

/** Middlewares de autorización */
const verifyRole = require("../middlewares/authorization.middleware");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);
// Define las rutas para los usuarios
router.get("/", verifyRole("ADMIN"), usuarioController.getUsers);
router.post("/", verifyRole("ADMIN"), usuarioController.createUser);
router.get("/:id", usuarioController.getUserById);
router.get("/role/:role", usuarioController.getUserByRole);
router.put(
  "/:id",
  verifyRole("ADMIN"),
  usuarioController.updateUser,
);
router.delete(
  "/:id",
  verifyRole("ADMIN"),
  usuarioController.deleteUser,
);

// Exporta el enrutador
module.exports = router;

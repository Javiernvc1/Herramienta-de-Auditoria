"use strict";
// Importa el modulo 'path' para obtener la ruta absoluta del archivo .env
const path = require("node:path");

/**  Obtiene la ruta absoluta del archivo .env. */
const envFilePath = path.resolve(__dirname, ".env");
// Carga las variables de entorno desde el archivo .env
require("dotenv").config({ path: envFilePath });

/** Puerto del servidor */
const PORT = process.env.PORT;
/** Host del servidor */
const HOST = process.env.HOST;
/** Usuario de la base de datos */
const DB_USER = process.env.DB_USER;
/** Contraseña de la base de datos */
const DB_PASSWORD = process.env.DB_PASSWORD;
/** Nombre de la base de datos */
const DB_NAME = process.env.DB_NAME;
/** Secreto para el token de acceso */
const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET;
/** Secreto para el token de refresco */
const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET;

const DB_PORT = process.env.DB_PORT;

module.exports = { PORT, HOST, DB_USER, DB_PASSWORD, DB_NAME, ACCESS_JWT_SECRET, REFRESH_JWT_SECRET, DB_PORT
 };

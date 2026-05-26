"use strict";

const { exec } = require("child_process");
const path = require("path");

const Script = require("../models/script.model");

const { handleError } = require("../utils/errorHandler");

/**
 * Ejecuta un script por ID
 */
async function executeScript(id_script) {
  try {

    // Buscar script en BD
    const script = await Script.findByPk(id_script);

    if (!script) {
      return [null, "El script no existe"];
    }

    // Construir comando completo
    const scriptPath = path.resolve(script.ruta);

    const fullCommand = `${script.comando} "${scriptPath}"`;

    console.log("Ejecutando:", fullCommand);

    // Ejecutar PowerShell
    return new Promise((resolve) => {

      exec(fullCommand, (error, stdout, stderr) => {

        // Error de ejecución
        if (error) {
          console.error(error);

          return resolve([
            null,
            "Error ejecutando script"
          ]);
        }

        // Error PowerShell
        if (stderr) {
          console.error(stderr);

          return resolve([
            null,
            stderr
          ]);
        }

        try {

          // Convertir JSON devuelto por PowerShell
          const result = JSON.parse(stdout);

          return resolve([
            result,
            null
          ]);

        } catch (parseError) {

          console.error(parseError);

          return resolve([
            null,
            "Error parseando JSON del script"
          ]);
        }
      });
    });

  } catch (error) {

    handleError(error, "executor.service -> executeScript");

    return [null, "Error interno del servidor"];
  }
}

module.exports = {
  executeScript
};
"use strict";

const { exec } = require("child_process");
const path = require("path");

const Script = require("../models/script.model");
const Parametro = require("../models/parametro.model");

const { handleError } = require("../utils/errorHandler");

/**
 * Ejecuta un script por ID
 */
async function executeScript(id_script) {
  try {

    const script = await Script.findByPk(id_script, {
      include: {
        model: Parametro,
        through: { attributes: [] }
      }
    });

    if (!script) {
      return [null, "El script no existe"];
    }

    const scriptPath = path.resolve(script.ruta);

    const fullCommand =
      `${script.comando} "${scriptPath}"`;

    console.log("=================================");
    console.log("Ejecutando script:");
    console.log(fullCommand);
    console.log("=================================");

    return new Promise((resolve) => {

      exec(
        fullCommand,
        {
          timeout: 30000,
          maxBuffer: 1024 * 1024
        },
        (error, stdout, stderr) => {

          if (error) {

            console.error("Error ejecutando script:");
            console.error(error);

            return resolve([
              null,
              "Error ejecutando script"
            ]);
          }

          // Advertencias PowerShell
          if (stderr) {

            console.warn("Advertencia PowerShell:");
            console.warn(stderr);
          }

          try {

            if (!stdout || stdout.trim() === "") {

              return resolve([
                null,
                "El script no retornó datos"
              ]);
            }

            const result = JSON.parse(stdout.trim());

            console.log("Resultado:");
            console.log(result);

            return resolve([
              result,
              null
            ]);

          } catch (parseError) {

            console.error("Error parseando JSON:");
            console.error(parseError);
            console.error("Salida recibida:");
            console.error(stdout);

            return resolve([
              null,
              "Error parseando JSON del script"
            ]);
          }
        }
      );
    });

  } catch (error) {

    handleError(
      error,
      "executor.service -> executeScript"
    );

    return [
      null,
      "Error interno del servidor"
    ];
  }
}

module.exports = {
  executeScript
};
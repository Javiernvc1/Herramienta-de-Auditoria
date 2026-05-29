"use strict";

const { exec } = require("child_process");
const util = require("util");

const execPromise = util.promisify(exec);

const Auditoria = require("../models/auditoria.model");
const Control = require("../models/control.model");
const Parametro = require("../models/parametro.model");
const Script = require("../models/script.model");
const ResultadoControl = require("../models/resultadoControl.model");

const { handleError } = require("../utils/errorHandler");

/**
 * Ejecuta una auditoría completa
 * @param {number} id_auditoria
 */
async function ejecutarAuditoria(id_auditoria) {
  try {

    // =========================
    // Buscar auditoría
    // =========================
    const auditoria = await Auditoria.findByPk(id_auditoria);

    if (!auditoria) {
      return [null, "La auditoría no existe"];
    }

    // =========================
    // Obtener controles
    // =========================
    const controles = await Control.findAll({
      include: [
        {
          model: Parametro,
          include: [Script]
        }
      ]
    });

    if (!controles || controles.length === 0) {
      return [null, "No existen controles"];
    }

    // =========================
    // Resultado final
    // =========================
    const resultados = [];

    // =========================
    // Recorrer controles
    // =========================
    for (const control of controles) {

      if (!control.Parametros || control.Parametros.length === 0) {
        continue;
      }

      // =========================
      // Recorrer parámetros
      // =========================
      for (const parametro of control.Parametros) {

        // =========================
        // Obtener script asociado
        // =========================
        const script = parametro.Script;

        if (!script) {
          continue;
        }

        try {

          // =========================
          // Construir comando
          // =========================
          const comandoCompleto =
            `${script.comando} "${script.ruta}"`;

          console.log("Ejecutando:", comandoCompleto);

          // =========================
          // Ejecutar script
          // =========================
          const { stdout, stderr } =
            await execPromise(comandoCompleto);

          if (stderr) {
            console.log(stderr);
            continue;
          }

          // =========================
          // Convertir resultado JSON
          // =========================
          const resultadoScript = JSON.parse(stdout);

          // =========================
          // Comparar resultado
          // =========================
          let cumple = false;

          if (
            parametro.valor_esperado === "NINGUNO"
          ) {
            cumple =
              !resultadoScript.valor_obtenido ||
              resultadoScript.valor_obtenido.trim() === "";
          }
          else {
            cumple =
              resultadoScript.valor_obtenido ===
              parametro.valor_esperado;
          }

          // =========================
          // Guardar resultado en BD
          // =========================
          const nuevoResultado =
            await ResultadoControl.create({

              resultado:
                resultadoScript.valor_obtenido,

              cumple,

              id_control:
                control.id_control,

              id_auditoria:
                auditoria.id_auditoria
            });

          // =========================
          // Agregar al arreglo final
          // =========================
          resultados.push({

            control:
              control.nombre,

            parametro:
              parametro.descripcion,

            valor_obtenido:
              resultadoScript.valor_obtenido,

            valor_esperado:
              parametro.valor_esperado,

            cumple
          });

        } catch (scriptError) {

          console.log(scriptError);

          resultados.push({

            control:
              control.nombre,

            parametro:
              parametro.descripcion,

            error:
              "Error ejecutando script",

            detalle:
              scriptError.message
          });
        }
      }
    }

    // =========================
    // Retornar resultados
    // =========================
    return [resultados, null];

  } catch (error) {

    handleError(
      error,
      "auditExecutor.service -> ejecutarAuditoria"
    );
  }
}

module.exports = {
  ejecutarAuditoria
};
"use strict";

const Auditoria = require("../models/auditoria.model");
const Empresa = require("../models/empresa.model");
const Equipo = require("../models/equipo.model");
const Marco = require("../models/marco.model");
const Control = require("../models/control.model");
const Parametro = require("../models/parametro.model");
const Script = require("../models/script.model");
const Resultado = require("../models/resultado.model");
const ResultadoControl = require("../models/resultadoControl.model");

const ExecutorService = require("./executor.service");

const { handleError } = require("../utils/errorHandler");

/**
 * Ejecuta una auditoría completa
 */
async function ejecutarAuditoria(id_auditoria) {

  try {

    const auditoria = await Auditoria.findByPk(
      id_auditoria,
      {
        include: [
          {
            model: Empresa,
            through: { attributes: [] },
            include: [
              {
                model: Equipo,
                through: { attributes: [] }
              }
            ]
          },
          {
            model: Marco,
            through: { attributes: [] },
            include: [
              {
                model: Control,
                through: { attributes: [] },
                include: [
                  {
                    model: Parametro,
                    through: { attributes: [] },
                    include: [
                      {
                        model: Script,
                        through: { attributes: [] }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    );

    if (!auditoria) {
      return [null, "La auditoría no existe"];
    }

    // ==========================
    // Crear resultado principal
    // ==========================

    const resultadoAuditoria =
      await Resultado.create({
        fecha_ejecucion: new Date()
      });

    await auditoria.addResultado(
      resultadoAuditoria
    );

    // ==========================
    // Asociar equipos
    // ==========================

    const equipos = [];

    for (const empresa of auditoria.Empresas || []) {

      if (
        empresa.Equipos &&
        empresa.Equipos.length > 0
      ) {

        equipos.push(
          ...empresa.Equipos
        );
      }
    }

    if (equipos.length > 0) {

      await resultadoAuditoria.addEquipos(
        equipos
      );
    }

    // ==========================
    // Ejecutar auditoría
    // ==========================

    const resultados = [];

    for (const marco of auditoria.Marcos || []) {

      for (const control of marco.Controls || []) {

        for (const parametro of control.Parametros || []) {

          if (
            !parametro.Scripts ||
            parametro.Scripts.length === 0
          ) {
            continue;
          }

          for (const script of parametro.Scripts) {

            try {

              const [
                resultadoScript,
                errorScript
              ] =
                await ExecutorService.executeScript(
                  script.id_script
                );

              if (errorScript) {

                resultados.push({
                  marco: marco.nombre,
                  control: control.nombre,
                  parametro: parametro.nombre,
                  error: errorScript
                });

                continue;
              }

              let estado = "NO CUMPLE";

              if (
                parametro.valor_esperado &&
                parametro.valor_esperado.toUpperCase() ===
                "INFORMATIVO"
              ) {

                estado = "INFORMATIVO";

              } else if (
                parametro.valor_esperado &&
                resultadoScript.valor_obtenido
              ) {

                estado =
                  resultadoScript.valor_obtenido
                    .trim()
                    .toLowerCase() ===
                  parametro.valor_esperado
                    .trim()
                    .toLowerCase()
                    ? "CUMPLE"
                    : "NO CUMPLE";
              }

              // ==========================
              // Crear ResultadoControl
              // ==========================

              const resultadoControl =
                await ResultadoControl.create({

                  valor_obtenido:
                    resultadoScript.valor_obtenido,

                  estado
                });

              await resultadoAuditoria.addResultadoControl(
                resultadoControl
              );

              await parametro.addResultadoControl(
                resultadoControl
              );

              resultados.push({

                marco:
                  marco.nombre,

                control:
                  control.nombre,

                parametro:
                  resultadoScript.parametro,

                valor_obtenido:
                  resultadoScript.valor_obtenido,

                valor_esperado:
                  parametro.valor_esperado,

                estado
              });

            } catch (scriptError) {

              console.error(scriptError);

              resultados.push({

                marco:
                  marco.nombre,

                control:
                  control.nombre,

                parametro:
                  parametro.nombre,

                error:
                  scriptError.message
              });
            }
          }
        }
      }
    }

    return [
      {
        id_resultado:
          resultadoAuditoria.id_resultado,

        fecha_ejecucion:
          resultadoAuditoria.fecha_ejecucion,

        equipos:
          equipos.map(e => ({
            id_equipo: e.id_equipo,
            hostname: e.hostname,
            ip: e.ip
          })),

        resultados
      },
      null
    ];

  } catch (error) {

    handleError(
      error,
      "auditExecutor.service -> ejecutarAuditoria"
    );

    return [
      null,
      "Error ejecutando auditoría"
    ];
  }
}

module.exports = {
  ejecutarAuditoria
};
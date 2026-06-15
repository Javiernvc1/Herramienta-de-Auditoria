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
const SSHExecutorService = require("./sshExecutor.service");

const { handleError } = require("../utils/errorHandler");

/**
 * Normaliza el sistema operativo del equipo
 */
function obtenerSistemaEquipo(equipo) {

  const nombreOS =
    equipo.nombreOS
      ? equipo.nombreOS.toLowerCase().trim()
      : "";

  if (
    nombreOS.includes("windows")
  ) {
    return "windows";
  }

  if (
    nombreOS.includes("linux") ||
    nombreOS.includes("ubuntu") ||
    nombreOS.includes("debian") ||
    nombreOS.includes("fedora") ||
    nombreOS.includes("centos") ||
    nombreOS.includes("redhat") ||
    nombreOS.includes("red hat")
  ) {
    return "linux";
  }

  return null;
}

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

    // ==========================================
    // Crear resultado principal
    // ==========================================

    const resultadoAuditoria =
      await Resultado.create({
        fecha_ejecucion: new Date()
      });

    await auditoria.addResultado(
      resultadoAuditoria
    );

    // ==========================================
    // Obtener equipos asociados
    // ==========================================

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

    // ==========================================
    // Ejecutar auditoría
    // ==========================================

    const resultados = [];

    for (const equipo of equipos) {

      const sistemaEquipo =
        obtenerSistemaEquipo(equipo);

      console.log(
        `\n=====================================`
      );

      console.log(
        `Auditando equipo: ${equipo.hostname}`
      );

      console.log(
        `Tipo conexión: ${equipo.tipo_conexion}`
      );

      console.log(
        `Sistema equipo: ${sistemaEquipo || "no_detectado"}`
      );

      console.log(
        `=====================================\n`
      );

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

                const sistemaScript =
                  script.sistema_operativo
                    ? script.sistema_operativo
                        .toLowerCase()
                        .trim()
                    : "";

                // ==========================================
                // Filtrar scripts por sistema operativo
                // ==========================================

                if (
                  sistemaEquipo &&
                  sistemaScript &&
                  sistemaEquipo !== sistemaScript
                ) {

                  console.log(
                    `Script omitido: ${script.nombre} | Equipo: ${sistemaEquipo} | Script: ${sistemaScript}`
                  );

                  continue;
                }

                if (
                  !sistemaEquipo
                ) {

                  resultados.push({
                    equipo:
                      equipo.hostname,

                    ip:
                      equipo.ip,

                    marco:
                      marco.nombre,

                    control:
                      control.nombre,

                    parametro:
                      parametro.nombre,

                    error:
                      "No se pudo determinar el sistema operativo del equipo"
                  });

                  continue;
                }

                let resultadoScript;
                let errorScript;

                // ==========================================
                // LOCAL
                // ==========================================

                if (
                  equipo.tipo_conexion === "LOCAL"
                ) {

                  [
                    resultadoScript,
                    errorScript
                  ] =
                    await ExecutorService.executeScript(
                      script.id_script
                    );

                }

                // ==========================================
                // SSH
                // ==========================================

                else if (
                  equipo.tipo_conexion === "SSH"
                ) {

                  [
                    resultadoScript,
                    errorScript
                  ] =
                    await SSHExecutorService.executeScript(
                      script,
                      equipo
                    );
                }

                else {

                  resultados.push({
                    equipo:
                      equipo.hostname,

                    ip:
                      equipo.ip,

                    marco:
                      marco.nombre,

                    control:
                      control.nombre,

                    parametro:
                      parametro.nombre,

                    error:
                      "Tipo de conexión no soportado"
                  });

                  continue;
                }

                // ==========================================
                // Error de ejecución
                // ==========================================

                if (errorScript) {

                  resultados.push({

                    equipo:
                      equipo.hostname,

                    ip:
                      equipo.ip,

                    marco:
                      marco.nombre,

                    control:
                      control.nombre,

                    parametro:
                      parametro.nombre,

                    error:
                      errorScript
                  });

                  continue;
                }

                if (
                  !resultadoScript ||
                  !resultadoScript.valor_obtenido
                ) {

                  resultados.push({

                    equipo:
                      equipo.hostname,

                    ip:
                      equipo.ip,

                    marco:
                      marco.nombre,

                    control:
                      control.nombre,

                    parametro:
                      parametro.nombre,

                    error:
                      "El script no retornó valor obtenido"
                  });

                  continue;
                }

                // ==========================================
                // Evaluar resultado
                // ==========================================

                let estado = "NO CUMPLE";

                if (
                  parametro.valor_esperado &&
                  parametro.valor_esperado
                    .toUpperCase() ===
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

                // ==========================================
                // Guardar ResultadoControl
                // ==========================================

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

                await equipo.addResultadoControl(
                  resultadoControl
                );

                resultados.push({

                  equipo:
                    equipo.hostname,

                  ip:
                    equipo.ip,

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

                console.error(
                  scriptError
                );

                resultados.push({

                  equipo:
                    equipo.hostname,

                  ip:
                    equipo.ip,

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
    }

    return [

      {
        id_resultado:
          resultadoAuditoria.id_resultado,

        fecha_ejecucion:
          resultadoAuditoria.fecha_ejecucion,

        equipos:
          equipos.map(e => ({

            id_equipo:
              e.id_equipo,

            hostname:
              e.hostname,

            ip:
              e.ip,

            tipo_conexion:
              e.tipo_conexion,

            nombreOS:
              e.nombreOS
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
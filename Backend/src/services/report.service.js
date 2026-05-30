"use strict";

const Auditoria = require("../models/auditoria.model");
const Empresa = require("../models/empresa.model");
const User = require("../models/user.model");
const Marco = require("../models/marco.model");
const Control = require("../models/control.model");
const Parametro = require("../models/parametro.model");
const Resultado = require("../models/resultado.model");
const Equipo = require("../models/equipo.model");
const ResultadoControl = require("../models/resultadoControl.model");

const { handleError } = require("../utils/errorHandler");

/**
 * Generar reporte completo de auditoría
 */
async function generarReporteAuditoria(id_auditoria) {

  try {

    const auditoria = await Auditoria.findByPk(
      id_auditoria,
      {
        include: [

          {
            model: Empresa,
            through: { attributes: [] },
            attributes: [
              "id_empresa",
              "nombre"
            ]
          },

          {
            model: User,
            through: { attributes: [] },
            attributes: [
              "id",
              "nombre",
              "apellido",
              "email"
            ]
          },

          {
            model: Marco,
            through: { attributes: [] },
            attributes: [
              "id_marco",
              "nombre"
            ]
          },

          {
            model: Resultado,
            through: { attributes: [] },

            include: [

              {
                model: Equipo,
                through: { attributes: [] },
                attributes: [
                  "id_equipo",
                  "nombreOS",
                  "hostname",
                  "ip"
                ]
              },

              {
                model: ResultadoControl,
                through: { attributes: [] },

                include: [

                  {
                    model: Parametro,
                    through: { attributes: [] },

                    include: [

                      {
                        model: Control,
                        through: { attributes: [] },

                        include: [

                          {
                            model: Marco,
                            through: { attributes: [] },
                            attributes: [
                              "id_marco",
                              "nombre"
                            ]
                          }
                        ]
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

    // ====================================
    // Último resultado ejecutado
    // ====================================

    const resultadosOrdenados =
      [...(auditoria.Resultados || [])]
        .sort(
          (a, b) =>
            new Date(b.fecha_ejecucion) -
            new Date(a.fecha_ejecucion)
        );

    const ultimoResultado =
      resultadosOrdenados[0];

    if (!ultimoResultado) {

      return [
        {
          auditoria: {
            id_auditoria:
              auditoria.id_auditoria,
            fecha:
              auditoria.fecha
          },

          empresas:
            auditoria.Empresas,

          auditores:
            auditoria.Users,

          marcos:
            auditoria.Marcos,

          equipos: [],

          metricas: {
            cumple: 0,
            no_cumple: 0,
            informativos: 0,
            porcentaje_cumplimiento: 0
          },

          resultados: []
        },
        null
      ];
    }

    // ====================================
    // Equipos únicos
    // ====================================

    const equiposUnicos =
      [
        ...new Map(
          (ultimoResultado.Equipos || [])
            .map(
              equipo => [
                equipo.id_equipo,
                equipo
              ]
            )
        ).values()
      ];

    // ====================================
    // Métricas
    // ====================================

    let cumple = 0;
    let noCumple = 0;
    let informativos = 0;

    const detalleResultados = [];

    for (
      const resultadoControl
      of (
        ultimoResultado.ResultadoControls || []
      )
    ) {

      const parametro =
        resultadoControl.Parametros?.[0];

      const control =
        parametro?.Controls?.[0];

      const marco =
        control?.Marcos?.[0];

      switch (
        resultadoControl.estado
      ) {

        case "CUMPLE":
          cumple++;
          break;

        case "NO CUMPLE":
          noCumple++;
          break;

        case "INFORMATIVO":
          informativos++;
          break;
      }

      detalleResultados.push({

        id_resultado_control:
          resultadoControl.id_resultado_control,

        marco:
          marco?.nombre || null,

        control:
          control?.nombre || null,

        parametro:
          parametro?.nombre || null,

        valor_esperado:
          parametro?.valor_esperado || null,

        valor_obtenido:
          resultadoControl.valor_obtenido,

        estado:
          resultadoControl.estado
      });
    }

    const totalEvaluables =
      cumple + noCumple;

    const porcentajeCumplimiento =
      totalEvaluables > 0
        ? Number(
            (
              (cumple /
                totalEvaluables) *
              100
            ).toFixed(2)
          )
        : 0;

    // ====================================
    // Reporte final
    // ====================================

    const reporte = {

      auditoria: {

        id_auditoria:
          auditoria.id_auditoria,

        fecha:
          auditoria.fecha,

        fecha_ejecucion:
          ultimoResultado.fecha_ejecucion
      },

      empresas:
        auditoria.Empresas,

      auditores:
        auditoria.Users,

      marcos:
        auditoria.Marcos,

      equipos:
        equiposUnicos,

      metricas: {

        cumple,

        no_cumple:
          noCumple,

        informativos,

        porcentaje_cumplimiento:
          porcentajeCumplimiento
      },

      resultados:
        detalleResultados
    };

    return [reporte, null];

  } catch (error) {

    handleError(
      error,
      "report.service -> generarReporteAuditoria"
    );

    return [
      null,
      "Error generando reporte"
    ];
  }
}

module.exports = {
  generarReporteAuditoria
};
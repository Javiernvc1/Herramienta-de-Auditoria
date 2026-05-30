"use strict";

const ReportService = require("../services/report.service");

const {
  respondSuccess,
  respondError
} = require("../utils/resHandler");

const {
  handleError
} = require("../utils/errorHandler");

/**
 * Obtener reporte completo de auditoría
 */
async function getReporteAuditoria(req, res) {

  try {

    const { id } = req.params;

    const [
      reporte,
      errorReporte
    ] =
      await ReportService.generarReporteAuditoria(id);

    if (errorReporte) {
      return respondError(
        req,
        res,
        404,
        errorReporte
      );
    }

    respondSuccess(
      req,
      res,
      200,
      reporte
    );

  } catch (error) {

    handleError(
      error,
      "report.controller -> getReporteAuditoria"
    );

    respondError(
      req,
      res,
      500,
      "No se pudo generar el reporte"
    );
  }
}

module.exports = {
  getReporteAuditoria
};
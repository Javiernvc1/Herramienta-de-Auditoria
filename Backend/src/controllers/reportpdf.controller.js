"use strict";

const ReportPDFService =
  require("../services/reportpdf.service");

const {
  respondError
} = require("../utils/resHandler");

const {
  handleError
} = require("../utils/errorHandler");

/**
 * Generar y descargar PDF de auditoría
 */
async function generarPDF(req, res) {

  try {

    const { id } = req.params;

    const [
      pdf,
      errorPDF
    ] =
      await ReportPDFService.generarPDF(id);

    if (errorPDF) {

      return respondError(
        req,
        res,
        404,
        errorPDF
      );
    }

    return res.download(
      pdf.ruta,
      pdf.archivo
    );

  } catch (error) {

    handleError(
      error,
      "reportpdf.controller -> generarPDF"
    );

    return respondError(
      req,
      res,
      500,
      "No se pudo generar el PDF"
    );
  }
}

module.exports = {
  generarPDF
};
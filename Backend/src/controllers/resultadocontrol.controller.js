"use strict";

const ResultadoControlService = require("../services/resultadocontrol.service");

const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");

// Obtener todos los resultados de control
async function getResultadosControl(req, res) {
  try {

    const [resultados, errorResultados] =
      await ResultadoControlService.getResultadosControl();

    if (errorResultados) {
      return respondError(req, res, 404, errorResultados);
    }

    resultados.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, resultados);

  } catch (error) {
    handleError(error, "resultadoControl.controller -> getResultadosControl");
    respondError(req, res, 500, "No se pudieron obtener los resultados");
  }
}

// Obtener resultado de control por ID
async function getResultadoControlById(req, res) {
  try {

    const { id } = req.params;

    const [resultado, errorResultado] =
      await ResultadoControlService.getResultadoControlById(id);

    if (errorResultado) {
      return respondError(req, res, 404, errorResultado);
    }

    respondSuccess(req, res, 200, resultado);

  } catch (error) {
    handleError(error, "resultadoControl.controller -> getResultadoControlById");
    respondError(req, res, 500, "No se pudo obtener el resultado");
  }
}

// Crear resultado de control
async function createResultadoControl(req, res) {
  try {

    const { body } = req;

    const [newResultado, errorResultado] =
      await ResultadoControlService.createResultadoControl(body);

    if (errorResultado) {
      return respondError(req, res, 400, errorResultado);
    }

    respondSuccess(req, res, 201, newResultado);

  } catch (error) {
    handleError(error, "resultadoControl.controller -> createResultadoControl");
    respondError(req, res, 500, "No se pudo crear el resultado");
  }
}

// Actualizar resultado de control
async function updateResultadoControl(req, res) {
  try {

    const { id } = req.params;
    const { body } = req;

    const [resultado, errorResultado] =
      await ResultadoControlService.updateResultadoControl(id, body);

    if (errorResultado) {
      return respondError(req, res, 400, errorResultado);
    }

    respondSuccess(req, res, 200, resultado);

  } catch (error) {
    handleError(error, "resultadoControl.controller -> updateResultadoControl");
    respondError(req, res, 500, "No se pudo actualizar el resultado");
  }
}

// Eliminar resultado de control
async function deleteResultadoControl(req, res) {
  try {

    const { id } = req.params;

    const [resultado, errorResultado] =
      await ResultadoControlService.deleteResultadoControl(id);

    if (errorResultado) {
      return respondError(req, res, 404, errorResultado);
    }

    respondSuccess(
      req,
      res,
      200,
      "Resultado de control eliminado exitosamente"
    );

  } catch (error) {
    handleError(error, "resultadoControl.controller -> deleteResultadoControl");
    respondError(req, res, 500, "No se pudo eliminar el resultado");
  }
}

// Asociar parámetro
async function assignParametro(req, res) {
  try {

    const { idResultadoControl, idParametro } = req.params;

    const [resultado, errorResultado] =
      await ResultadoControlService.assignParametro(
        idResultadoControl,
        idParametro
      );

    if (errorResultado) {
      return respondError(req, res, 400, errorResultado);
    }

    respondSuccess(req, res, 200, resultado);

  } catch (error) {
    handleError(error, "resultadoControl.controller -> assignParametro");
    respondError(req, res, 500, "No se pudo asociar el parámetro");
  }
}

// Desasociar parámetro
async function removeParametro(req, res) {
  try {

    const { idResultadoControl, idParametro } = req.params;

    const [resultado, errorResultado] =
      await ResultadoControlService.removeParametro(
        idResultadoControl,
        idParametro
      );

    if (errorResultado) {
      return respondError(req, res, 400, errorResultado);
    }

    respondSuccess(req, res, 200, resultado);

  } catch (error) {
    handleError(error, "resultadoControl.controller -> removeParametro");
    respondError(req, res, 500, "No se pudo desasociar el parámetro");
  }
}

// Asociar resultado
async function assignResultado(req, res) {
  try {

    const { idResultadoControl, idResultado } = req.params;

    const [resultado, errorResultado] =
      await ResultadoControlService.assignResultado(
        idResultadoControl,
        idResultado
      );

    if (errorResultado) {
      return respondError(req, res, 400, errorResultado);
    }

    respondSuccess(req, res, 200, resultado);

  } catch (error) {
    handleError(error, "resultadoControl.controller -> assignResultado");
    respondError(req, res, 500, "No se pudo asociar el resultado");
  }
}

// Desasociar resultado
async function removeResultado(req, res) {
  try {

    const { idResultadoControl, idResultado } = req.params;

    const [resultado, errorResultado] =
      await ResultadoControlService.removeResultado(
        idResultadoControl,
        idResultado
      );

    if (errorResultado) {
      return respondError(req, res, 400, errorResultado);
    }

    respondSuccess(req, res, 200, resultado);

  } catch (error) {
    handleError(error, "resultadoControl.controller -> removeResultado");
    respondError(req, res, 500, "No se pudo desasociar el resultado");
  }
}

module.exports = {
  getResultadosControl,
  getResultadoControlById,
  createResultadoControl,
  updateResultadoControl,
  deleteResultadoControl,
  assignParametro,
  removeParametro,
  assignResultado,
  removeResultado
};
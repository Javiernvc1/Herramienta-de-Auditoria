"use strict";

const ParametroService = require("../services/parametro.service");

const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");

// Obtener todos los parámetros
async function getParametros(req, res) {
  try {
    const [parametros, errorParametros] = await ParametroService.getParametros();

    if (errorParametros) {
      return respondError(req, res, 404, errorParametros);
    }

    parametros.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, parametros);

  } catch (error) {
    handleError(error, "parametro.controller -> getParametros");
    respondError(req, res, 500, "No se pudieron obtener los parámetros");
  }
}

// Obtener parámetro por ID
async function getParametroById(req, res) {
  try {
    const { id } = req.params;

    const [parametro, errorParametro] = await ParametroService.getParametroById(id);

    if (errorParametro) {
      return respondError(req, res, 404, errorParametro);
    }

    respondSuccess(req, res, 200, parametro);

  } catch (error) {
    handleError(error, "parametro.controller -> getParametroById");
    respondError(req, res, 500, "No se pudo obtener el parámetro");
  }
}

// Crear parámetro
async function createParametro(req, res) {
  try {
    const { body } = req;

    const [newParametro, errorParametro] = await ParametroService.createParametro(body);

    if (errorParametro) {
      return respondError(req, res, 400, errorParametro);
    }

    if (!newParametro) {
      return respondError(req, res, 400, "No se creó el parámetro");
    }

    respondSuccess(req, res, 201, newParametro);

  } catch (error) {
    handleError(error, "parametro.controller -> createParametro");
    respondError(req, res, 500, "No se pudo crear el parámetro");
  }
}

// Actualizar parámetro
async function updateParametro(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;

    const [parametro, errorParametro] = await ParametroService.updateParametro(id, body);

    if (errorParametro) {
      return respondError(req, res, 400, errorParametro);
    }

    respondSuccess(req, res, 200, parametro);

  } catch (error) {
    handleError(error, "parametro.controller -> updateParametro");
    respondError(req, res, 500, "No se pudo actualizar el parámetro");
  }
}

// Eliminar parámetro
async function deleteParametro(req, res) {
  try {
    const { id } = req.params;

    const [parametro, errorParametro] = await ParametroService.deleteParametro(id);

    if (errorParametro) {
      return respondError(req, res, 404, errorParametro);
    }

    respondSuccess(req, res, 200, "Parámetro eliminado exitosamente");

  } catch (error) {
    handleError(error, "parametro.controller -> deleteParametro");
    respondError(req, res, 500, "No se pudo eliminar el parámetro");
  }
}

module.exports = {
  getParametros,
  getParametroById,
  createParametro,
  updateParametro,
  deleteParametro,
};
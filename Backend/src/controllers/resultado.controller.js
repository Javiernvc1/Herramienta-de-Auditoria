"use strict";

const ResultadoService = require("../services/resultado.service");

const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");

// Obtener todos los resultados
async function getResultados(req, res) {
  try {

    const [resultados, errorResultados] =
      await ResultadoService.getResultados();

    if (errorResultados) {
      return respondError(req, res, 404, errorResultados);
    }

    resultados.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, resultados);

  } catch (error) {
    handleError(error, "resultado.controller -> getResultados");
    respondError(req, res, 500, "No se pudieron obtener los resultados");
  }
}

// Obtener resultado por ID
async function getResultadoById(req, res) {
  try {

    const { id } = req.params;

    const [resultado, errorResultado] =
      await ResultadoService.getResultadoById(id);

    if (errorResultado) {
      return respondError(req, res, 404, errorResultado);
    }

    respondSuccess(req, res, 200, resultado);

  } catch (error) {
    handleError(error, "resultado.controller -> getResultadoById");
    respondError(req, res, 500, "No se pudo obtener el resultado");
  }
}

// Crear resultado
async function createResultado(req, res) {
  try {

    const { body } = req;

    const [newResultado, errorResultado] =
      await ResultadoService.createResultado(body);

    if (errorResultado) {
      return respondError(req, res, 400, errorResultado);
    }

    if (!newResultado) {
      return respondError(req, res, 400, "No se creó el resultado");
    }

    respondSuccess(req, res, 201, newResultado);

  } catch (error) {
    handleError(error, "resultado.controller -> createResultado");
    respondError(req, res, 500, "No se pudo crear el resultado");
  }
}

// Actualizar resultado
async function updateResultado(req, res) {
  try {

    const { id } = req.params;
    const { body } = req;

    const [resultado, errorResultado] =
      await ResultadoService.updateResultado(id, body);

    if (errorResultado) {
      return respondError(req, res, 400, errorResultado);
    }

    respondSuccess(req, res, 200, resultado);

  } catch (error) {
    handleError(error, "resultado.controller -> updateResultado");
    respondError(req, res, 500, "No se pudo actualizar el resultado");
  }
}

// Eliminar resultado
async function deleteResultado(req, res) {
  try {

    const { id } = req.params;

    const [resultado, errorResultado] =
      await ResultadoService.deleteResultado(id);

    if (errorResultado) {
      return respondError(req, res, 404, errorResultado);
    }

    respondSuccess(req, res, 200, "Resultado eliminado exitosamente");

  } catch (error) {
    handleError(error, "resultado.controller -> deleteResultado");
    respondError(req, res, 500, "No se pudo eliminar el resultado");
  }
}

// Asociar auditoría
async function assignAuditoria(req, res) {
  try {

    const { id, auditoriaId } = req.params;

    const [resultado, error] =
      await ResultadoService.assignAuditoria(id, auditoriaId);

    if (error) {
      return respondError(req, res, 404, error);
    }

    respondSuccess(req, res, 200, resultado);

  } catch (error) {
    handleError(error, "resultado.controller -> assignAuditoria");
    respondError(req, res, 500, "No se pudo asociar la auditoría");
  }
}

// Remover auditoría
async function removeAuditoria(req, res) {
  try {

    const { id, auditoriaId } = req.params;

    const [resultado, error] =
      await ResultadoService.removeAuditoria(id, auditoriaId);

    if (error) {
      return respondError(req, res, 404, error);
    }

    respondSuccess(req, res, 200, resultado);

  } catch (error) {
    handleError(error, "resultado.controller -> removeAuditoria");
    respondError(req, res, 500, "No se pudo remover la auditoría");
  }
}

// Asociar equipo
async function assignEquipo(req, res) {
  try {

    const { id, equipoId } = req.params;

    const [resultado, error] =
      await ResultadoService.assignEquipo(id, equipoId);

    if (error) {
      return respondError(req, res, 404, error);
    }

    respondSuccess(req, res, 200, resultado);

  } catch (error) {
    handleError(error, "resultado.controller -> assignEquipo");
    respondError(req, res, 500, "No se pudo asociar el equipo");
  }
}

// Remover equipo
async function removeEquipo(req, res) {
  try {

    const { id, equipoId } = req.params;

    const [resultado, error] =
      await ResultadoService.removeEquipo(id, equipoId);

    if (error) {
      return respondError(req, res, 404, error);
    }

    respondSuccess(req, res, 200, resultado);

  } catch (error) {
    handleError(error, "resultado.controller -> removeEquipo");
    respondError(req, res, 500, "No se pudo remover el equipo");
  }
}

module.exports = {
  getResultados,
  getResultadoById,
  createResultado,
  updateResultado,
  deleteResultado,

  assignAuditoria,
  removeAuditoria,

  assignEquipo,
  removeEquipo
};
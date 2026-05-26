"use strict";

const MarcoService = require("../services/marco.service");

const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");

// Obtener todos los marcos
async function getMarcos(req, res) {
  try {
    const [marcos, errorMarcos] = await MarcoService.getMarcos();

    if (errorMarcos) {
      return respondError(req, res, 404, errorMarcos);
    }

    marcos.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, marcos);

  } catch (error) {
    handleError(error, "marco.controller -> getMarcos");
    respondError(req, res, 500, "No se pudieron obtener los marcos");
  }
}

// Obtener marco por ID
async function getMarcoById(req, res) {
  try {
    const { id } = req.params;

    const [marco, errorMarco] = await MarcoService.getMarcoById(id);

    if (errorMarco) {
      return respondError(req, res, 404, errorMarco);
    }

    respondSuccess(req, res, 200, marco);

  } catch (error) {
    handleError(error, "marco.controller -> getMarcoById");
    respondError(req, res, 500, "No se pudo obtener el marco");
  }
}

// Crear marco
async function createMarco(req, res) {
  try {
    const { body } = req;

    const [newMarco, errorMarco] = await MarcoService.createMarco(body);

    if (errorMarco) {
      return respondError(req, res, 400, errorMarco);
    }

    if (!newMarco) {
      return respondError(req, res, 400, "No se creó el marco");
    }

    respondSuccess(req, res, 201, newMarco);

  } catch (error) {
    handleError(error, "marco.controller -> createMarco");
    respondError(req, res, 500, "No se pudo crear el marco");
  }
}

// Actualizar marco
async function updateMarco(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;

    const [marco, errorMarco] = await MarcoService.updateMarco(id, body);

    if (errorMarco) {
      return respondError(req, res, 400, errorMarco);
    }

    respondSuccess(req, res, 200, marco);

  } catch (error) {
    handleError(error, "marco.controller -> updateMarco");
    respondError(req, res, 500, "No se pudo actualizar el marco");
  }
}

// Eliminar marco
async function deleteMarco(req, res) {
  try {
    const { id } = req.params;

    const [marco, errorMarco] = await MarcoService.deleteMarco(id);

    if (errorMarco) {
      return respondError(req, res, 404, errorMarco);
    }

    respondSuccess(req, res, 200, "Marco eliminado exitosamente");

  } catch (error) {
    handleError(error, "marco.controller -> deleteMarco");
    respondError(req, res, 500, "No se pudo eliminar el marco");
  }
}

module.exports = {
  getMarcos,
  getMarcoById,
  createMarco,
  updateMarco,
  deleteMarco,
};
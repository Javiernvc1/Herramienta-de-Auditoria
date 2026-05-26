"use strict";

const ControlService = require("../services/control.service");

const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");

// Obtener todos los controles
async function getControles(req, res) {
  try {
    const [controles, errorControles] = await ControlService.getControles();

    if (errorControles) {
      return respondError(req, res, 404, errorControles);
    }

    controles.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, controles);

  } catch (error) {
    handleError(error, "control.controller -> getControles");
    respondError(req, res, 500, "No se pudieron obtener los controles");
  }
}

// Obtener control por ID
async function getControlById(req, res) {
  try {
    const { id } = req.params;

    const [control, errorControl] = await ControlService.getControlById(id);

    if (errorControl) {
      return respondError(req, res, 404, errorControl);
    }

    respondSuccess(req, res, 200, control);

  } catch (error) {
    handleError(error, "control.controller -> getControlById");
    respondError(req, res, 500, "No se pudo obtener el control");
  }
}

// Crear control
async function createControl(req, res) {
  try {
    const { body } = req;

    const [newControl, errorControl] = await ControlService.createControl(body);

    if (errorControl) {
      return respondError(req, res, 400, errorControl);
    }

    if (!newControl) {
      return respondError(req, res, 400, "No se creó el control");
    }

    respondSuccess(req, res, 201, newControl);

  } catch (error) {
    handleError(error, "control.controller -> createControl");
    respondError(req, res, 500, "No se pudo crear el control");
  }
}

// Actualizar control
async function updateControl(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;

    const [control, errorControl] = await ControlService.updateControl(id, body);

    if (errorControl) {
      return respondError(req, res, 400, errorControl);
    }

    respondSuccess(req, res, 200, control);

  } catch (error) {
    handleError(error, "control.controller -> updateControl");
    respondError(req, res, 500, "No se pudo actualizar el control");
  }
}

// Eliminar control
async function deleteControl(req, res) {
  try {
    const { id } = req.params;

    const [control, errorControl] = await ControlService.deleteControl(id);

    if (errorControl) {
      return respondError(req, res, 404, errorControl);
    }

    respondSuccess(req, res, 200, "Control eliminado exitosamente");

  } catch (error) {
    handleError(error, "control.controller -> deleteControl");
    respondError(req, res, 500, "No se pudo eliminar el control");
  }
}

module.exports = {
  getControles,
  getControlById,
  createControl,
  updateControl,
  deleteControl,
};
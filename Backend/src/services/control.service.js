"use strict";

const Control = require("../models/control.model");
const Marco = require("../models/marco.model");

const { handleError } = require("../utils/errorHandler");

/**
 * Obtener todos los controles
 */
async function getControles() {
  try {
    const controles = await Control.findAll({
      include: {
        model: Marco,
        through: { attributes: [] },
        attributes: ["id_marco", "nombre"]
      }
    });

    if (!controles || controles.length === 0) {
      return [null, "No hay controles registrados"];
    }

    return [controles, null];

  } catch (error) {
    handleError(error, "control.service -> getControles");
  }
}

/**
 * Obtener control por ID
 */
async function getControlById(id) {
  try {
    const control = await Control.findByPk(id, {
      include: {
        model: Marco,
        through: { attributes: [] },
        attributes: ["id_marco", "nombre"]
      }
    });

    if (!control) {
      return [null, "El control no existe"];
    }

    return [control, null];

  } catch (error) {
    handleError(error, "control.service -> getControlById");
  }
}

/**
 * Crear control
 */
async function createControl(data) {
  try {

    const {
      nombre,
      descripcion
    } = data;

    const controlFound = await Control.findOne({
      where: { nombre }
    });

    if (controlFound) {
      return [null, "El control ya existe"];
    }

    const newControl = await Control.create({
      nombre,
      descripcion
    });

    return [newControl, null];

  } catch (error) {
    handleError(error, "control.service -> createControl");
  }
}

/**
 * Actualizar control
 */
async function updateControl(id, data) {
  try {

    const {
      nombre,
      descripcion
    } = data;

    const control = await Control.findByPk(id);

    if (!control) {
      return [null, "El control no existe"];
    }

    await control.update({
      nombre,
      descripcion
    });

    return [control, null];

  } catch (error) {
    handleError(error, "control.service -> updateControl");
  }
}

/**
 * Eliminar control
 */
async function deleteControl(id) {
  try {

    const control = await Control.findByPk(id);

    if (!control) {
      return [null, "El control no existe"];
    }

    await control.destroy();

    return [control, null];

  } catch (error) {
    handleError(error, "control.service -> deleteControl");
  }
}

async function assignMarco(controlId, marcoId) {
  try {

    const control = await Control.findByPk(controlId);
    if (!control) {
      return [null, "El control no existe"];
    }

    const marco = await Marco.findByPk(marcoId);
    if (!marco) {
      return [null, "El marco no existe"];
    }

    await control.addMarco(marco);

    return [control, null];

  } catch (error) {
    handleError(error, "control.service -> assignMarco");
  }
}

async function removeMarco(controlId, marcoId) {
  try {

    const control = await Control.findByPk(controlId);
    if (!control) {
      return [null, "El control no existe"];
    }

    const marco = await Marco.findByPk(marcoId);
    if (!marco) {
      return [null, "El marco no existe"];
    }

    await control.removeMarco(marco);

    return [control, null];

  } catch (error) {
    handleError(error, "control.service -> removeMarco");
  }
}


module.exports = {
  getControles,
  getControlById,
  createControl,
  updateControl,
  deleteControl,
  assignMarco,
  removeMarco
};
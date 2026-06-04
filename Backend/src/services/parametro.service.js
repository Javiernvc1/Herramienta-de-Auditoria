"use strict";

const Parametro = require("../models/parametro.model");
const Control = require("../models/control.model");

const { handleError } = require("../utils/errorHandler");

/**
 * Obtener todos los parámetros
 */
async function getParametros() {
  try {
    const parametros = await Parametro.findAll({
      include: {
        model: Control,
        through: { attributes: [] },
        attributes: ["id_control", "nombre"]
      }
    });

    if (!parametros || parametros.length === 0) {
      return [null, "No hay parámetros registrados"];
    }

    return [parametros, null];
  } catch (error) {
    handleError(error, "parametro.service -> getParametros");
  }
}

/**
 * Obtener parámetro por ID
 */
async function getParametroById(id) {
  try {
    const parametro = await Parametro.findByPk(id, {
      include: {
        model: Control,
        through: { attributes: [] },
        attributes: ["id_control", "nombre"]
      }
    });

    if (!parametro) {
      return [null, "El parámetro no existe"];
    }

    return [parametro, null];
  } catch (error) {
    handleError(error, "parametro.service -> getParametroById");
  }
}

/**
 * Crear parámetro
 */
async function createParametro(data) {
  try {
    const {
      nombre,
      descripcion,
      valor_esperado,
    } = data;


    const parametroFound = await Parametro.findOne({
      where: {
        nombre
      }
    });

    if (parametroFound) {
      return [null, "El parámetro ya existe en este control"];
    }

    const newParametro = await Parametro.create({
      nombre,
      descripcion,
      valor_esperado
    });


    return [newParametro, null];
  } catch (error) {
    handleError(error, "parametro.service -> createParametro");
  }
}

/**
 * Actualizar parámetro
 */
async function updateParametro(id, data) {
  try {
    const {
      nombre,
      descripcion,
      valor_esperado,
    } = data;

    const parametro = await Parametro.findByPk(id);

    if (!parametro) {
      return [null, "El parámetro no existe"];
    }


    await parametro.update({
      nombre,
      descripcion,
      valor_esperado,
    });

    return [parametro, null];
  } catch (error) {
    handleError(error, "parametro.service -> updateParametro");
  }
}

/**
 * Eliminar parámetro
 */
async function deleteParametro(id) {
  try {
    const parametro = await Parametro.findByPk(id);

    if (!parametro) {
      return [null, "El parámetro no existe"];
    }

    await parametro.destroy();

    return [parametro, null];
  } catch (error) {
    handleError(error, "parametro.service -> deleteParametro");
  }
}

async function assignControl(parametroId, controlId) {
  try {
    const parametro = await Parametro.findByPk(parametroId);
    if (!parametro) {
      return [null, "El parámetro no existe"];
    }

    const control = await Control.findByPk(controlId);
    if (!control) {
      return [null, "El control no existe"];
    }

    await parametro.addControl(control);

    return [parametro, null];

  } catch (error) {
    handleError(error, "parametro.service -> assignControl");
  }
}

async function removeControl(parametroId, controlId) {
  try {
    const parametro = await Parametro.findByPk(parametroId);
    if (!parametro) {
      return [null, "El parámetro no existe"];
    }
    const control = await Control.findByPk(controlId);
    if (!control) {
      return [null, "El control no existe"];
    }
    await parametro.removeControl(control);

    return [parametro, null];

  } catch (error) {
    handleError(error, "parametro.service -> removeControl");
  }
}






module.exports = {
  getParametros,
  getParametroById,
  createParametro,
  updateParametro,
  deleteParametro,
  assignControl,
  removeControl
};
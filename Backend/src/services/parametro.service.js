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
      id_control
    } = data;

    const controlFound = await Control.findByPk(id_control);

    if (!controlFound) {
      return [null, "El control no existe"];
    }

    const parametroFound = await Parametro.findOne({
      where: {
        nombre,
        id_control
      }
    });

    if (parametroFound) {
      return [null, "El parámetro ya existe en este control"];
    }

    const newParametro = await Parametro.create({
      nombre,
      descripcion,
      valor_esperado,
      id_control
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
      id_control
    } = data;

    const parametro = await Parametro.findByPk(id);

    if (!parametro) {
      return [null, "El parámetro no existe"];
    }

    const controlFound = await Control.findByPk(id_control);

    if (!controlFound) {
      return [null, "El control no existe"];
    }

    await parametro.update({
      nombre,
      descripcion,
      valor_esperado,
      id_control
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

module.exports = {
  getParametros,
  getParametroById,
  createParametro,
  updateParametro,
  deleteParametro,
};
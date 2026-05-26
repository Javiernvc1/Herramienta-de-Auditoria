"use strict";

const ResultadoControl = require("../models/resultadocontrol.model");
const Resultado = require("../models/resultado.model");
const Control = require("../models/control.model");

const { handleError } = require("../utils/errorHandler");

/**
 * Obtener todos los resultados de control
 */
async function getResultadosControl() {
  try {
    const resultados = await ResultadoControl.findAll({
      include: [
        {
          model: Resultado,
          attributes: ["id_resultado", "estado"]
        },
        {
          model: Control,
          attributes: ["id_control", "nombre"]
        }
      ]
    });

    if (!resultados || resultados.length === 0) {
      return [null, "No hay resultados de control registrados"];
    }

    return [resultados, null];
  } catch (error) {
    handleError(error, "resultadoControl.service -> getResultadosControl");
  }
}

/**
 * Obtener resultado de control por ID
 */
async function getResultadoControlById(id) {
  try {
    const resultado = await ResultadoControl.findByPk(id, {
      include: [
        {
          model: Resultado,
          attributes: ["id_resultado", "estado"]
        },
        {
          model: Control,
          attributes: ["id_control", "nombre"]
        }
      ]
    });

    if (!resultado) {
      return [null, "El resultado de control no existe"];
    }

    return [resultado, null];
  } catch (error) {
    handleError(error, "resultadoControl.service -> getResultadoControlById");
  }
}

/**
 * Crear resultado de control
 */
async function createResultadoControl(data) {
  try {
    const {
      estado,
      observacion,
      evidencia,
      id_resultado,
      id_control
    } = data;

    const resultadoFound = await Resultado.findByPk(id_resultado);

    if (!resultadoFound) {
      return [null, "El resultado no existe"];
    }

    const controlFound = await Control.findByPk(id_control);

    if (!controlFound) {
      return [null, "El control no existe"];
    }

    const newResultadoControl = await ResultadoControl.create({
      estado,
      observacion,
      evidencia,
      id_resultado,
      id_control
    });

    return [newResultadoControl, null];
  } catch (error) {
    handleError(error, "resultadoControl.service -> createResultadoControl");
  }
}

/**
 * Actualizar resultado de control
 */
async function updateResultadoControl(id, data) {
  try {
    const {
      estado,
      observacion,
      evidencia,
      id_resultado,
      id_control
    } = data;

    const resultadoControl = await ResultadoControl.findByPk(id);

    if (!resultadoControl) {
      return [null, "El resultado de control no existe"];
    }

    await resultadoControl.update({
      estado,
      observacion,
      evidencia,
      id_resultado,
      id_control
    });

    return [resultadoControl, null];
  } catch (error) {
    handleError(error, "resultadoControl.service -> updateResultadoControl");
  }
}

/**
 * Eliminar resultado de control
 */
async function deleteResultadoControl(id) {
  try {
    const resultadoControl = await ResultadoControl.findByPk(id);

    if (!resultadoControl) {
      return [null, "El resultado de control no existe"];
    }

    await resultadoControl.destroy();

    return [resultadoControl, null];
  } catch (error) {
    handleError(error, "resultadoControl.service -> deleteResultadoControl");
  }
}

module.exports = {
  getResultadosControl,
  getResultadoControlById,
  createResultadoControl,
  updateResultadoControl,
  deleteResultadoControl,
};
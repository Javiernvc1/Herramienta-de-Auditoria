"use strict";

const Marco = require("../models/marco.model");

const { handleError } = require("../utils/errorHandler");

/**
 * Obtener todos los marcos
 */
async function getMarcos() {
  try {
    const marcos = await Marco.findAll({
      include: {
        model: Control,
        through: { attributes: [] },
        attributes: ["id_control", "nombre"]
      }
    });

    if (!marcos || marcos.length === 0) {
      return [null, "No hay marcos registrados"];
    }

    return [marcos, null];
  } catch (error) {
    handleError(error, "marco.service -> getMarcos");
  }
}

/**
 * Obtener marco por ID
 */
async function getMarcoById(id) {
  try {
    const marco = await Marco.findByPk(id, {
      include: {
        model: Control,
        through: { attributes: [] },
        attributes: ["id_control", "nombre"]
      }
    });

    if (!marco) {
      return [null, "El marco no existe"];
    }

    return [marco, null];
  } catch (error) {
    handleError(error, "marco.service -> getMarcoById");
  }
}

/**
 * Crear marco
 */
async function createMarco(data) {
  try {
    const {
      nombre,
      descripcion,
      version
    } = data;

    const marcoFound = await Marco.findOne({
      where: { nombre }
    });

    if (marcoFound) {
      return [null, "El marco ya existe"];
    }

    const newMarco = await Marco.create({
      nombre,
      descripcion,
      version
    });

    return [newMarco, null];
  } catch (error) {
    handleError(error, "marco.service -> createMarco");
  }
}

/**
 * Actualizar marco
 */
async function updateMarco(id, data) {
  try {
    const {
      nombre,
      descripcion,
      version
    } = data;

    const marco = await Marco.findByPk(id);

    if (!marco) {
      return [null, "El marco no existe"];
    }

    await marco.update({
      nombre,
      descripcion,
      version
    });

    return [marco, null];
  } catch (error) {
    handleError(error, "marco.service -> updateMarco");
  }
}

/**
 * Eliminar marco
 */
async function deleteMarco(id) {
  try {
    const marco = await Marco.findByPk(id);

    if (!marco) {
      return [null, "El marco no existe"];
    }

    await marco.destroy();

    return [marco, null];
  } catch (error) {
    handleError(error, "marco.service -> deleteMarco");
  }
}

module.exports = {
  getMarcos,
  getMarcoById,
  createMarco,
  updateMarco,
  deleteMarco,
};
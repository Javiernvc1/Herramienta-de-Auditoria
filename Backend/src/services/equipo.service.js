"use strict";

const Equipo = require("../models/equipo.model");
const Empresa = require("../models/empresa.model");

const { handleError } = require("../utils/errorHandler");

/**
 * Obtener todos los equipos
 */
async function getEquipos() {
  try {
    const equipos = await Equipo.findAll({
      include: {
        model: Empresa,
        attributes: ["id_empresa", "nombre"]
      }
    });

    if (!equipos || equipos.length === 0) {
      return [null, "No hay equipos registrados"];
    }

    return [equipos, null];
  } catch (error) {
    handleError(error, "equipo.service -> getEquipos");
  }
}

/**
 * Obtener equipo por ID
 */
async function getEquipoById(id) {
  try {
    const equipo = await Equipo.findByPk(id, {
      include: {
        model: Empresa,
        attributes: ["id_empresa", "nombre"]
      }
    });

    if (!equipo) {
      return [null, "El equipo no existe"];
    }

    return [equipo, null];
  } catch (error) {
    handleError(error, "equipo.service -> getEquipoById");
  }
}

/**
 * Crear equipo
 */
async function createEquipo(data) {
  try {
    const {
      nombre,
      tipo,
      ip,
      sistema_operativo,
      id_empresa
    } = data;

    const empresaFound = await Empresa.findByPk(id_empresa);

    if (!empresaFound) {
      return [null, "La empresa no existe"];
    }

    const equipoFound = await Equipo.findOne({
      where: { ip }
    });

    if (equipoFound) {
      return [null, "Ya existe un equipo con esa IP"];
    }

    const newEquipo = await Equipo.create({
      nombre,
      tipo,
      ip,
      sistema_operativo,
      id_empresa
    });

    return [newEquipo, null];
  } catch (error) {
    handleError(error, "equipo.service -> createEquipo");
  }
}

/**
 * Actualizar equipo
 */
async function updateEquipo(id, data) {
  try {
    const {
      nombre,
      tipo,
      ip,
      sistema_operativo,
      id_empresa
    } = data;

    const equipo = await Equipo.findByPk(id);

    if (!equipo) {
      return [null, "El equipo no existe"];
    }

    const empresaFound = await Empresa.findByPk(id_empresa);

    if (!empresaFound) {
      return [null, "La empresa no existe"];
    }

    await equipo.update({
      nombre,
      tipo,
      ip,
      sistema_operativo,
      id_empresa
    });

    return [equipo, null];
  } catch (error) {
    handleError(error, "equipo.service -> updateEquipo");
  }
}

/**
 * Eliminar equipo
 */
async function deleteEquipo(id) {
  try {
    const equipo = await Equipo.findByPk(id);

    if (!equipo) {
      return [null, "El equipo no existe"];
    }

    await equipo.destroy();

    return [equipo, null];
  } catch (error) {
    handleError(error, "equipo.service -> deleteEquipo");
  }
}

module.exports = {
  getEquipos,
  getEquipoById,
  createEquipo,
  updateEquipo,
  deleteEquipo,
};
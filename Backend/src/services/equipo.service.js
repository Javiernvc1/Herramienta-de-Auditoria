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
        through: { attributes: [] },
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
        through: { attributes: [] },
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
      nombreOS,
      hostname,
      ip
    } = data;

    const equipoFound = await Equipo.findOne({
      where: { ip }
    });

    if (equipoFound) {
      return [null, "Ya existe un equipo con esa IP"];
    }

    const newEquipo = await Equipo.create({
      nombreOS,
      hostname,
      ip
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
      nombreOS,
      hostname,
      ip
    } = data;

    const equipo = await Equipo.findByPk(id);

    if (!equipo) {
      return [null, "El equipo no existe"];
    }

    await equipo.update({
      nombreOS,
      hostname,
      ip
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

/**
 * Asociar equipo a empresa
 */
async function assignEmpresa(idEquipo, idEmpresa) {
  try {

    const equipo = await Equipo.findByPk(idEquipo);

    if (!equipo) {
      return [null, "El equipo no existe"];
    }

    const empresa = await Empresa.findByPk(idEmpresa);

    if (!empresa) {
      return [null, "La empresa no existe"];
    }

    await equipo.addEmpresa(empresa);

    return ["Equipo asociado correctamente", null];

  } catch (error) {
    handleError(error, "equipo.service -> assignEmpresa");
  }
}

/**
 * Quitar asociación empresa-equipo
 */
async function removeEmpresa(idEquipo, idEmpresa) {
  try {

    const equipo = await Equipo.findByPk(idEquipo);

    if (!equipo) {
      return [null, "El equipo no existe"];
    }

    const empresa = await Empresa.findByPk(idEmpresa);

    if (!empresa) {
      return [null, "La empresa no existe"];
    }

    await equipo.removeEmpresa(empresa);

    return ["Asociación eliminada correctamente", null];

  } catch (error) {
    handleError(error, "equipo.service -> removeEmpresa");
  }
}

module.exports = {
  getEquipos,
  getEquipoById,
  createEquipo,
  updateEquipo,
  deleteEquipo,
  assignEmpresa,
  removeEmpresa
};
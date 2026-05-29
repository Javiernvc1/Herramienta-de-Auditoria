"use strict";

const EquipoService = require("../services/equipo.service");

const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");

// Obtener todos los equipos
async function getEquipos(req, res) {
  try {
    const [equipos, errorEquipos] = await EquipoService.getEquipos();

    if (errorEquipos) {
      return respondError(req, res, 404, errorEquipos);
    }

    equipos.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, equipos);

  } catch (error) {
    handleError(error, "equipo.controller -> getEquipos");
    respondError(req, res, 500, "No se pudieron obtener los equipos");
  }
}

// Obtener equipo por ID
async function getEquipoById(req, res) {
  try {
    const { id } = req.params;

    const [equipo, errorEquipo] = await EquipoService.getEquipoById(id);

    if (errorEquipo) {
      return respondError(req, res, 404, errorEquipo);
    }

    respondSuccess(req, res, 200, equipo);

  } catch (error) {
    handleError(error, "equipo.controller -> getEquipoById");
    respondError(req, res, 500, "No se pudo obtener el equipo");
  }
}

// Crear equipo
async function createEquipo(req, res) {
  try {
    const { body } = req;

    const [newEquipo, errorEquipo] = await EquipoService.createEquipo(body);

    if (errorEquipo) {
      return respondError(req, res, 400, errorEquipo);
    }

    if (!newEquipo) {
      return respondError(req, res, 400, "No se creó el equipo");
    }

    respondSuccess(req, res, 201, newEquipo);

  } catch (error) {
    handleError(error, "equipo.controller -> createEquipo");
    respondError(req, res, 500, "No se pudo crear el equipo");
  }
}

// Actualizar equipo
async function updateEquipo(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;

    const [equipo, errorEquipo] = await EquipoService.updateEquipo(id, body);

    if (errorEquipo) {
      return respondError(req, res, 400, errorEquipo);
    }

    respondSuccess(req, res, 200, equipo);

  } catch (error) {
    handleError(error, "equipo.controller -> updateEquipo");
    respondError(req, res, 500, "No se pudo actualizar el equipo");
  }
}

// Eliminar equipo
async function deleteEquipo(req, res) {
  try {
    const { id } = req.params;

    const [equipo, errorEquipo] = await EquipoService.deleteEquipo(id);

    if (errorEquipo) {
      return respondError(req, res, 404, errorEquipo);
    }

    respondSuccess(req, res, 200, "Equipo eliminado exitosamente");

  } catch (error) {
    handleError(error, "equipo.controller -> deleteEquipo");
    respondError(req, res, 500, "No se pudo eliminar el equipo");
  }
}

// Asociar equipo a empresa
async function assignEmpresa(req, res) {
  try {

    const { idEquipo, idEmpresa } = req.params;

    const [result, error] = await EquipoService.assignEmpresa(
      idEquipo,
      idEmpresa
    );

    if (error) {
      return respondError(req, res, 400, error);
    }

    respondSuccess(req, res, 200, result);

  } catch (error) {
    handleError(error, "equipo.controller -> assignEmpresa");
    respondError(req, res, 500, "No se pudo asociar la empresa al equipo");
  }
}

// Eliminar asociación empresa-equipo
async function removeEmpresa(req, res) {
  try {

    const { idEquipo, idEmpresa } = req.params;

    const [result, error] = await EquipoService.removeEmpresa(
      idEquipo,
      idEmpresa
    );

    if (error) {
      return respondError(req, res, 400, error);
    }

    respondSuccess(req, res, 200, result);

  } catch (error) {
    handleError(error, "equipo.controller -> removeEmpresa");
    respondError(req, res, 500, "No se pudo eliminar la asociación");
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
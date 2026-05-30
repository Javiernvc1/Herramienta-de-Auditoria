"use strict";

const Resultado = require("../models/resultado.model");
const Auditoria = require("../models/auditoria.model");
const Equipo = require("../models/equipo.model");

const { handleError } = require("../utils/errorHandler");

/**
 * Obtener todos los resultados
 */
async function getResultados() {
  try {

    const resultados = await Resultado.findAll({
      include: [
        {
          model: Auditoria,
          through: { attributes: [] },
          attributes: ["id_auditoria", "fecha"]
        },
        {
          model: Equipo,
          through: { attributes: [] },
          attributes: ["id_equipo", "nombreOS", "hostname", "ip"]
        }
      ]
    });

    if (!resultados || resultados.length === 0) {
      return [null, "No hay resultados registrados"];
    }

    return [resultados, null];

  } catch (error) {
    handleError(error, "resultado.service -> getResultados");
  }
}

/**
 * Obtener resultado por ID
 */
async function getResultadoById(id) {
  try {

    const resultado = await Resultado.findByPk(id, {
      include: [
        {
          model: Auditoria,
          through: { attributes: [] },
          attributes: ["id_auditoria", "fecha"]
        },
        {
          model: Equipo,
          through: { attributes: [] },
          attributes: ["id_equipo", "nombreOS", "hostname", "ip"]
        }
      ]
    });

    if (!resultado) {
      return [null, "El resultado no existe"];
    }

    return [resultado, null];

  } catch (error) {
    handleError(error, "resultado.service -> getResultadoById");
  }
}

/**
 * Crear resultado
 */
async function createResultado(data) {
  try {

    const { fecha_ejecucion } = data;

    const newResultado = await Resultado.create({
      fecha_ejecucion
    });

    return [newResultado, null];

  } catch (error) {
    handleError(error, "resultado.service -> createResultado");
  }
}

/**
 * Actualizar resultado
 */
async function updateResultado(id, data) {
  try {

    const { fecha_ejecucion } = data;

    const resultado = await Resultado.findByPk(id);

    if (!resultado) {
      return [null, "El resultado no existe"];
    }

    await resultado.update({
      fecha_ejecucion
    });

    return [resultado, null];

  } catch (error) {
    handleError(error, "resultado.service -> updateResultado");
  }
}

/**
 * Eliminar resultado
 */
async function deleteResultado(id) {
  try {

    const resultado = await Resultado.findByPk(id);

    if (!resultado) {
      return [null, "El resultado no existe"];
    }

    await resultado.destroy();

    return [resultado, null];

  } catch (error) {
    handleError(error, "resultado.service -> deleteResultado");
  }
}

/**
 * Asociar auditoría a resultado
 */
async function assignAuditoria(resultadoId, auditoriaId) {
  try {

    const resultado = await Resultado.findByPk(resultadoId);

    if (!resultado) {
      return [null, "El resultado no existe"];
    }

    const auditoria = await Auditoria.findByPk(auditoriaId);

    if (!auditoria) {
      return [null, "La auditoría no existe"];
    }

    await resultado.addAuditoria(auditoria);

    return [resultado, null];

  } catch (error) {
    handleError(error, "resultado.service -> assignAuditoria");
  }
}

/**
 * Remover auditoría de resultado
 */
async function removeAuditoria(resultadoId, auditoriaId) {
  try {

    const resultado = await Resultado.findByPk(resultadoId);

    if (!resultado) {
      return [null, "El resultado no existe"];
    }

    const auditoria = await Auditoria.findByPk(auditoriaId);

    if (!auditoria) {
      return [null, "La auditoría no existe"];
    }

    await resultado.removeAuditoria(auditoria);

    return [resultado, null];

  } catch (error) {
    handleError(error, "resultado.service -> removeAuditoria");
  }
}

/**
 * Asociar equipo a resultado
 */
async function assignEquipo(resultadoId, equipoId) {
  try {

    const resultado = await Resultado.findByPk(resultadoId);

    if (!resultado) {
      return [null, "El resultado no existe"];
    }

    const equipo = await Equipo.findByPk(equipoId);

    if (!equipo) {
      return [null, "El equipo no existe"];
    }

    await resultado.addEquipo(equipo);

    return [resultado, null];

  } catch (error) {
    handleError(error, "resultado.service -> assignEquipo");
  }
}

/**
 * Remover equipo de resultado
 */
async function removeEquipo(resultadoId, equipoId) {
  try {

    const resultado = await Resultado.findByPk(resultadoId);

    if (!resultado) {
      return [null, "El resultado no existe"];
    }

    const equipo = await Equipo.findByPk(equipoId);

    if (!equipo) {
      return [null, "El equipo no existe"];
    }

    await resultado.removeEquipo(equipo);

    return [resultado, null];

  } catch (error) {
    handleError(error, "resultado.service -> removeEquipo");
  }
}

module.exports = {
  getResultados,
  getResultadoById,
  createResultado,
  updateResultado,
  deleteResultado,

  assignAuditoria,
  removeAuditoria,

  assignEquipo,
  removeEquipo
};
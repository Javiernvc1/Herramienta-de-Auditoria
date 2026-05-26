"use strict";

const Script = require("../models/script.model");
const Parametro = require("../models/parametro.model");

const { handleError } = require("../utils/errorHandler");

/**
 * Obtener todos los scripts
 */
async function getScripts() {
  try {
    const scripts = await Script.findAll({
      include: {
        model: Parametro,
        attributes: ["id_parametro", "nombre"]
      }
    });

    if (!scripts || scripts.length === 0) {
      return [null, "No hay scripts registrados"];
    }

    return [scripts, null];
  } catch (error) {
    handleError(error, "script.service -> getScripts");
  }
}

/**
 * Obtener script por ID
 */
async function getScriptById(id) {
  try {
    const script = await Script.findByPk(id, {
      include: {
        model: Parametro,
        attributes: ["id_parametro", "nombre"]
      }
    });

    if (!script) {
      return [null, "El script no existe"];
    }

    return [script, null];
  } catch (error) {
    handleError(error, "script.service -> getScriptById");
  }
}

/**
 * Crear script
 */
async function createScript(data) {
  try {
    const {
      nombre,
      tipo,
      ruta,
      comando,
      id_parametro
    } = data;

    const parametroFound = await Parametro.findByPk(id_parametro);

    if (!parametroFound) {
      return [null, "El parámetro no existe"];
    }

    const scriptFound = await Script.findOne({
      where: {
        nombre,
        id_parametro
      }
    });

    if (scriptFound) {
      return [null, "El script ya existe para este parámetro"];
    }

    const newScript = await Script.create({
      nombre,
      tipo,
      ruta,
      comando,
      id_parametro
    });

    return [newScript, null];

  } catch (error) {
    handleError(error, "script.service -> createScript");
  }
}

/**
 * Actualizar script
 */
async function updateScript(id, data) {
  try {
    const {
      nombre,
      descripcion,
      contenido,
      lenguaje,
      id_parametro
    } = data;

    const script = await Script.findByPk(id);

    if (!script) {
      return [null, "El script no existe"];
    }

    const parametroFound = await Parametro.findByPk(id_parametro);

    if (!parametroFound) {
      return [null, "El parámetro no existe"];
    }

    await script.update({
      nombre,
      descripcion,
      contenido,
      lenguaje,
      id_parametro
    });

    return [script, null];
  } catch (error) {
    handleError(error, "script.service -> updateScript");
  }
}

/**
 * Eliminar script
 */
async function deleteScript(id) {
  try {
    const script = await Script.findByPk(id);

    if (!script) {
      return [null, "El script no existe"];
    }

    await script.destroy();

    return [script, null];
  } catch (error) {
    handleError(error, "script.service -> deleteScript");
  }
}

module.exports = {
  getScripts,
  getScriptById,
  createScript,
  updateScript,
  deleteScript,
};
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
      comando
    } = data;

    const scriptFound = await Script.findOne({
      where: {
        nombre
      }
    });

      if (scriptFound) {
        return [null, "El script ya existe"];
      }

    const newScript = await Script.create({
      nombre,
      tipo,
      ruta,
      comando,
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
      lenguaje
    } = data;

    const script = await Script.findByPk(id);

    if (!script) {
      return [null, "El script no existe"];
    }

    await script.update({
      nombre,
      descripcion,
      contenido,
      lenguaje
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

async function assignParametro(scriptId, parametroId) {
  try {
    const script = await Script.findByPk(scriptId);

    if (!script) {
      return [null, "El script no existe"];
    }

    const parametro = await Parametro.findByPk(parametroId);
    if (!parametro) {
      return [null, "El parámetro no existe"];
    }

    await script.addParametro(parametro);

    return [script, null];
  } catch (error) {
    handleError(error, "script.service -> assignParametro");
  }
}

async function removeParametro(scriptId, parametroId) {
  try {
    const script = await Script.findByPk(scriptId);

    if (!script) {
      return [null, "El script no existe"];
    }

    const parametro = await Parametro.findByPk(parametroId);
    if (!parametro) {
      return [null, "El parámetro no existe"];
    }

    await script.removeParametro(parametro);

    return [script, null];
  } catch (error) {
    handleError(error, "script.service -> removeParametro");
  }
}





module.exports = {
  getScripts,
  getScriptById,
  createScript,
  updateScript,
  deleteScript,
  assignParametro,
  removeParametro
};
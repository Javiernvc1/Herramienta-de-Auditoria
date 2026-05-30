"use strict";

const ScriptService = require("../services/script.service");

const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");

// Obtener todos los scripts
async function getScripts(req, res) {
  try {
    const [scripts, errorScripts] = await ScriptService.getScripts();

    if (errorScripts) {
      return respondError(req, res, 404, errorScripts);
    }

    scripts.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, scripts);

  } catch (error) {
    handleError(error, "script.controller -> getScripts");
    respondError(req, res, 500, "No se pudieron obtener los scripts");
  }
}

// Obtener script por ID
async function getScriptById(req, res) {
  try {
    const { id } = req.params;

    const [script, errorScript] = await ScriptService.getScriptById(id);

    if (errorScript) {
      return respondError(req, res, 404, errorScript);
    }

    respondSuccess(req, res, 200, script);

  } catch (error) {
    handleError(error, "script.controller -> getScriptById");
    respondError(req, res, 500, "No se pudo obtener el script");
  }
}

// Crear script
async function createScript(req, res) {
  try {
    const { body } = req;

    const [newScript, errorScript] = await ScriptService.createScript(body);

    if (errorScript) {
      return respondError(req, res, 400, errorScript);
    }

    if (!newScript) {
      return respondError(req, res, 400, "No se creó el script");
    }

    respondSuccess(req, res, 201, newScript);

  } catch (error) {
    handleError(error, "script.controller -> createScript");
    respondError(req, res, 500, "No se pudo crear el script");
  }
}

// Actualizar script
async function updateScript(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;

    const [script, errorScript] = await ScriptService.updateScript(id, body);

    if (errorScript) {
      return respondError(req, res, 400, errorScript);
    }

    respondSuccess(req, res, 200, script);

  } catch (error) {
    handleError(error, "script.controller -> updateScript");
    respondError(req, res, 500, "No se pudo actualizar el script");
  }
}

// Eliminar script
async function deleteScript(req, res) {
  try {
    const { id } = req.params;

    const [script, errorScript] = await ScriptService.deleteScript(id);

    if (errorScript) {
      return respondError(req, res, 404, errorScript);
    }

    respondSuccess(req, res, 200, "Script eliminado exitosamente");

  } catch (error) {
    handleError(error, "script.controller -> deleteScript");
    respondError(req, res, 500, "No se pudo eliminar el script");
  }
}


async function assignParametro(req, res) {
  try {
    const { id, parametroId } = req.params;

    const [result, error] = await ScriptService.assignParametro(id, parametroId);

    if (error) {
      return respondError(req, res, 400, error);
    }

    respondSuccess(req, res, 200, "Parámetro asignado al script exitosamente");
    
  } catch (error) {
    handleError(error, "script.controller -> assignParametro");
    respondError(req, res, 500, "No se pudo asignar el parámetro al script");
  }
}

async function removeParametro(req, res) {
  try {
    const { id, parametroId } = req.params;

    const [result, error] = await ScriptService.removeParametro(id, parametroId);

    if (error) {
      return respondError(req, res, 400, error);
    }

    respondSuccess(req, res, 200, "Parámetro removido del script exitosamente");

  } catch (error) {
    handleError(error, "script.controller -> removeParametro");
    respondError(req, res, 500, "No se pudo remover el parámetro del script");
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
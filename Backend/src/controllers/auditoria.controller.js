"use strict";

const AuditoriaService = require("../services/auditoria.service");

const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");

// Obtener auditorías
async function getAuditorias(req, res) {
  try {
    const [auditorias, errorAuditorias] = await AuditoriaService.getAuditorias();

    if (errorAuditorias) {
      return respondError(req, res, 404, errorAuditorias);
    }

    auditorias.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, auditorias);

  } catch (error) {
    handleError(error, "auditoria.controller -> getAuditorias");
    respondError(req, res, 500, "No se pudieron obtener las auditorías");
  }
}

// Obtener auditoría por ID
async function getAuditoriaById(req, res) {
  try {
    const { id } = req.params;

    const [auditoria, errorAuditoria] =
      await AuditoriaService.getAuditoriaById(id);

    if (errorAuditoria) {
      return respondError(req, res, 404, errorAuditoria);
    }

    respondSuccess(req, res, 200, auditoria);

  } catch (error) {
    handleError(error, "auditoria.controller -> getAuditoriaById");
    respondError(req, res, 500, "No se pudo obtener la auditoría");
  }
}

// Crear auditoría
async function createAuditoria(req, res) {
  try {
    const { body } = req;

    const [newAuditoria, errorAuditoria] =
      await AuditoriaService.createAuditoria(body);

    if (errorAuditoria) {
      return respondError(req, res, 400, errorAuditoria);
    }

    if (!newAuditoria) {
      return respondError(req, res, 400, "No se creó la auditoría");
    }

    respondSuccess(req, res, 201, newAuditoria);

  } catch (error) {
    handleError(error, "auditoria.controller -> createAuditoria");
    respondError(req, res, 500, "No se pudo crear la auditoría");
  }
}

// Actualizar auditoría
async function updateAuditoria(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;

    const [auditoria, errorAuditoria] =
      await AuditoriaService.updateAuditoria(id, body);

    if (errorAuditoria) {
      return respondError(req, res, 400, errorAuditoria);
    }

    respondSuccess(req, res, 200, auditoria);

  } catch (error) {
    handleError(error, "auditoria.controller -> updateAuditoria");
    respondError(req, res, 500, "No se pudo actualizar la auditoría");
  }
}

// Eliminar auditoría
async function deleteAuditoria(req, res) {
  try {
    const { id } = req.params;

    const [auditoria, errorAuditoria] =
      await AuditoriaService.deleteAuditoria(id);

    if (errorAuditoria) {
      return respondError(req, res, 404, errorAuditoria);
    }

    respondSuccess(req, res, 200, "Auditoría eliminada exitosamente");

  } catch (error) {
    handleError(error, "auditoria.controller -> deleteAuditoria");
    respondError(req, res, 500, "No se pudo eliminar la auditoría");
  }
}

// Asignar empresa a auditoría
async function assignEmpresa(req, res) {
  try {

    const { id, empresaId } = req.params;
    console.log("ID auditoría:", id);
    console.log("ID empresa:", empresaId);
    const [auditoria, error] =
      await AuditoriaService.assignEmpresa(id, empresaId);

    if (error) {
      return respondError(req, res, 404, error);
    }

    respondSuccess(req, res, 200, auditoria);

  } catch (error) {
    handleError(error, "auditoria.controller -> assignEmpresa");
    respondError(req, res, 500, "No se pudo asignar la empresa");
  }
}

// Remover empresa de auditoría
async function removeEmpresa(req, res) {
  try {

    const { id, empresaId } = req.params;

    const [auditoria, error] =
      await AuditoriaService.removeEmpresa(id, empresaId);

    if (error) {
      return respondError(req, res, 404, error);
    }

    respondSuccess(req, res, 200, auditoria);

  } catch (error) {
    handleError(error, "auditoria.controller -> removeEmpresa");
    respondError(req, res, 500, "No se pudo remover la empresa");
  }
}

// Asignar usuario a auditoría
async function assignUser(req, res) {
  try {

    const { id, userId } = req.params;

    const [auditoria, error] =
      await AuditoriaService.assignUsuario(id, userId);

    if (error) {
      return respondError(req, res, 404, error);
    }

    respondSuccess(req, res, 200, auditoria);

  } catch (error) {
    handleError(error, "auditoria.controller -> assignUser");
    respondError(req, res, 500, "No se pudo asignar el usuario");
  }
}

// Remover usuario de auditoría
async function removeUser(req, res) {
  try {

    const { id, userId } = req.params;

    const [auditoria, error] =
      await AuditoriaService.removeUsuario(id, userId);

    if (error) {
      return respondError(req, res, 404, error);
    }

    respondSuccess(req, res, 200, auditoria);

  } catch (error) {
    handleError(error, "auditoria.controller -> removeUser");
    respondError(req, res, 500, "No se pudo remover el usuario");
  }
}

// Asignar marco a auditoría
async function assignMarco(req, res) {
  try {

    const { id, marcoId } = req.params;

    const [auditoria, error] =
      await AuditoriaService.assignMarco(id, marcoId);

    if (error) {
      return respondError(req, res, 404, error);
    }

    respondSuccess(req, res, 200, auditoria);

  } catch (error) {
    handleError(error, "auditoria.controller -> assignMarco");
    respondError(req, res, 500, "No se pudo asignar el marco");
  }
}

// Remover marco de auditoría
async function removeMarco(req, res) {
  try {

    const { id, marcoId } = req.params;

    const [auditoria, error] =
      await AuditoriaService.removeMarco(id, marcoId);

    if (error) {
      return respondError(req, res, 404, error);
    }

    respondSuccess(req, res, 200, auditoria);

  } catch (error) {
    handleError(error, "auditoria.controller -> removeMarco");
    respondError(req, res, 500, "No se pudo remover el marco");
  }
}


module.exports = {
  getAuditorias,
  getAuditoriaById,
  createAuditoria,
  updateAuditoria,
  deleteAuditoria,
  assignEmpresa,
  removeEmpresa,
  assignUser,
  removeUser,
  assignMarco,
  removeMarco
};
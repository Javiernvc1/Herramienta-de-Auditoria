"use strict";

const Auditoria = require("../models/auditoria.model");
const Empresa = require("../models/empresa.model");
const User = require("../models/user.model");
const Marco = require("../models/marco.model");

const { handleError } = require("../utils/errorHandler");

/**
 * Obtener todas las auditorías
 */
async function getAuditorias() {
  try {
    const auditorias = await Auditoria.findAll({
      include: [
        {
          model: Empresa,
          through: { attributes: [] },
          attributes: ["id_empresa", "nombre"]
        },
        {
          model: User,
          through: { attributes: [] },
          attributes: ["id", "nombre", "apellido", "email"]
        },
        {
          model: Marco,
          through: { attributes: [] },
          attributes: ["id_marco", "nombre"]
        }
      ]
    });

    if (!auditorias || auditorias.length === 0) {
      return [null, "No hay auditorías registradas"];
    }

    return [auditorias, null];

  } catch (error) {
    handleError(error, "auditoria.service -> getAuditorias");
  }
}

/**
 * Obtener auditoría por ID
 */
async function getAuditoriaById(id) {
  try {
    const auditoria = await Auditoria.findByPk(id, {
      include: [
        {
          model: Empresa,
          through: { attributes: [] },
          attributes: ["id_empresa", "nombre"]
        },
        {
          model: User,
          through: { attributes: [] },
          attributes: ["id", "nombre", "apellido", "email"]
        },
        {
          model: Marco,
          through: { attributes: [] },
          attributes: ["id_marco", "nombre"]
        }
      ]
    });

    if (!auditoria) {
      return [null, "La auditoría no existe"];
    }

    return [auditoria, null];

  } catch (error) {
    handleError(error, "auditoria.service -> getAuditoriaById");
  }
}

/**
 * Crear auditoría
 */
async function createAuditoria(data) {
  try {

    const { fecha } = data;

    const newAuditoria = await Auditoria.create({
      fecha
    });

    return [newAuditoria, null];

  } catch (error) {
    handleError(error, "auditoria.service -> createAuditoria");
  }
}

/**
 * Actualizar auditoría
 */
async function updateAuditoria(id, data) {
  try {

    const { fecha } = data;

    const auditoria = await Auditoria.findByPk(id);

    if (!auditoria) {
      return [null, "La auditoría no existe"];
    }

    await auditoria.update({
      fecha
    });

    return [auditoria, null];

  } catch (error) {
    handleError(error, "auditoria.service -> updateAuditoria");
  }
}

/**
 * Eliminar auditoría
 */
async function deleteAuditoria(id) {
  try {

    const auditoria = await Auditoria.findByPk(id);

    if (!auditoria) {
      return [null, "La auditoría no existe"];
    }

    await auditoria.destroy();

    return [auditoria, null];

  } catch (error) {
    handleError(error, "auditoria.service -> deleteAuditoria");
  }
}

async function assignEmpresa(auditoriaId, empresaId) {
  try {

    const auditoria = await Auditoria.findByPk(auditoriaId);

    if (!auditoria) {
      return [null, "La auditoría no existe"];
    }

    const empresa = await Empresa.findByPk(empresaId);

    if (!empresa) {
      return [null, "La empresa no existe"];
    }

    await auditoria.addEmpresa(empresa);

    return [auditoria, null];

  } catch (error) {
    handleError(error, "auditoria.service -> assignEmpresa");
  }
}

async function removeEmpresa(auditoriaId, empresaId) {
  try {

    const auditoria = await Auditoria.findByPk(auditoriaId);

    if (!auditoria) {
      return [null, "La auditoría no existe"];
    }

    const empresa = await Empresa.findByPk(empresaId);

    if (!empresa) {
      return [null, "La empresa no existe"];
    }

    await auditoria.removeEmpresa(empresa);

    return [auditoria, null];

  } catch (error) {
    handleError(error, "auditoria.service -> removeEmpresa");
  }
}

async function assignUsuario(auditoriaId, usuarioId) {
  try {

    const auditoria = await Auditoria.findByPk(auditoriaId);

    if (!auditoria) {
      return [null, "La auditoría no existe"];
    }

    const usuario = await User.findByPk(usuarioId);

    if (!usuario) {
      return [null, "El usuario no existe"];
    }

    await auditoria.addUser(usuario);

    return [auditoria, null];

  } catch (error) {
    handleError(error, "auditoria.service -> assignUsuario");
  }
}

async function removeUsuario(auditoriaId, usuarioId) {
  try {

    const auditoria = await Auditoria.findByPk(auditoriaId);

    if (!auditoria) {
      return [null, "La auditoría no existe"];
    }

    const usuario = await User.findByPk(usuarioId);

    if (!usuario) {
      return [null, "El usuario no existe"];
    }

    await auditoria.removeUser(usuario);

    return [auditoria, null];

  } catch (error) {
    handleError(error, "auditoria.service -> removeUsuario");
  }
}

async function assignMarco(auditoriaId, marcoId) {
  try {

    const auditoria = await Auditoria.findByPk(auditoriaId);

    if (!auditoria) {
      return [null, "La auditoría no existe"];
    }

    const marco = await Marco.findByPk(marcoId);

    if (!marco) {
      return [null, "El marco no existe"];
    }

    await auditoria.addMarco(marco);

    return [auditoria, null];

  } catch (error) {
    handleError(error, "auditoria.service -> assignMarco");
  }
}

async function removeMarco(auditoriaId, marcoId) {
  try {

    const auditoria = await Auditoria.findByPk(auditoriaId);

    if (!auditoria) {
      return [null, "La auditoría no existe"];
    }

    const marco = await Marco.findByPk(marcoId);

    if (!marco) {
      return [null, "El marco no existe"];
    }

    await auditoria.removeMarco(marco);

    return [auditoria, null];

  } catch (error) {
    handleError(error, "auditoria.service -> removeMarco");
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
  assignUsuario,
  removeUsuario,
  assignMarco,
  removeMarco
};
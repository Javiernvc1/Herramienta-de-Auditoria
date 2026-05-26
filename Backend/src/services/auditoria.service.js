"use strict";

const Auditoria = require("../models/auditoria.model");
const Empresa = require("../models/empresa.model");
const Equipo = require("../models/equipo.model");
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
          attributes: ["id_empresa", "nombre"]
        },
        {
          model: Equipo,
          attributes: ["id_equipo", "nombre"]
        },
        {
          model: User,
          attributes: ["id", "nombre", "apellido", "email"]
        },
        {
          model: Marco,
          through: { attributes: [] }
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
          attributes: ["id_empresa", "nombre"]
        },
        {
          model: Equipo,
          attributes: ["id_equipo", "nombre"]
        },
        {
          model: User,
          attributes: ["id", "nombre", "apellido", "email"]
        },
        {
          model: Marco,
          through: { attributes: [] }
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
    const {
      nombre,
      descripcion,
      fecha_inicio,
      fecha_fin,
      estado,
      id_empresa,
      id_equipo,
      id_usuario,
      marcos
    } = data;

    const empresaFound = await Empresa.findByPk(id_empresa);
    if (!empresaFound) {
      return [null, "La empresa no existe"];
    }

    const equipoFound = await Equipo.findByPk(id_equipo);
    if (!equipoFound) {
      return [null, "El equipo no existe"];
    }

    const userFound = await User.findByPk(id_usuario);
    if (!userFound) {
      return [null, "El usuario no existe"];
    }

    const newAuditoria = await Auditoria.create({
      nombre,
      descripcion,
      fecha_inicio,
      fecha_fin,
      estado,
      id_empresa,
      id_equipo,
      id_usuario
    });

    // Relación muchos a muchos con marcos
    if (marcos && marcos.length > 0) {
      const marcosFound = await Marco.findAll({
        where: {
          id_marco: marcos
        }
      });

      await newAuditoria.setMarcos(marcosFound);
    }

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
    const {
      nombre,
      descripcion,
      fecha_inicio,
      fecha_fin,
      estado,
      id_empresa,
      id_equipo,
      id_usuario,
      marcos
    } = data;

    const auditoria = await Auditoria.findByPk(id);

    if (!auditoria) {
      return [null, "La auditoría no existe"];
    }

    await auditoria.update({
      nombre,
      descripcion,
      fecha_inicio,
      fecha_fin,
      estado,
      id_empresa,
      id_equipo,
      id_usuario
    });

    // Actualizar marcos relacionados
    if (marcos) {
      const marcosFound = await Marco.findAll({
        where: {
          id_marco: marcos
        }
      });

      await auditoria.setMarcos(marcosFound);
    }

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

module.exports = {
  getAuditorias,
  getAuditoriaById,
  createAuditoria,
  updateAuditoria,
  deleteAuditoria,
};
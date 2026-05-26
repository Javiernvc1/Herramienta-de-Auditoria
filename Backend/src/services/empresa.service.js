"use strict";

const Empresa = require("../models/empresa.model");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtener todas las empresas
 */
async function getEmpresas() {
  try {
    const empresas = await Empresa.findAll();

    if (!empresas || empresas.length === 0) {
      return [null, "No hay empresas registradas"];
    }

    return [empresas, null];
  } catch (error) {
    handleError(error, "empresa.service -> getEmpresas");
  }
}

/**
 * Obtener empresa por ID
 */
async function getEmpresaById(id) {
  try {
    const empresa = await Empresa.findByPk(id);

    if (!empresa) {
      return [null, "La empresa no existe"];
    }

    return [empresa, null];
  } catch (error) {
    handleError(error, "empresa.service -> getEmpresaById");
  }
}

/**
 * Crear empresa
 */
async function createEmpresa(data) {
  try {
    const { nombre } = data;

    const empresaFound = await Empresa.findOne({
      where: { nombre }
    });

    if (empresaFound) {
      return [null, "La empresa ya existe"];
    }

    const newEmpresa = await Empresa.create({
      nombre
    });

    return [newEmpresa, null];
  } catch (error) {
    handleError(error, "empresa.service -> createEmpresa");
  }
}

/**
 * Actualizar empresa
 */
async function updateEmpresa(id, data) {
  try {
    const { nombre } = data;

    const empresa = await Empresa.findByPk(id);

    if (!empresa) {
      return [null, "La empresa no existe"];
    }

    await empresa.update({
      nombre
    });

    return [empresa, null];
  } catch (error) {
    handleError(error, "empresa.service -> updateEmpresa");
  }
}

/**
 * Eliminar empresa
 */
async function deleteEmpresa(id) {
  try {
    const empresa = await Empresa.findByPk(id);

    if (!empresa) {
      return [null, "La empresa no existe"];
    }

    await empresa.destroy();

    return [empresa, null];
  } catch (error) {
    handleError(error, "empresa.service -> deleteEmpresa");
  }
}

module.exports = {
  getEmpresas,
  getEmpresaById,
  createEmpresa,
  updateEmpresa,
  deleteEmpresa,
};
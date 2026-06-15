"use strict";

const EmpresaService = require("../services/empresa.service");
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const { empresaBodySchema, empresaIdSchema } = require("../schema/empresa.schema");
// Obtener todas las empresas
async function getEmpresas(req, res) {
  try {
    const [empresas, errorEmpresas] = await EmpresaService.getEmpresas();

    if (errorEmpresas) {
      return respondError(req, res, 404, errorEmpresas);
    }

    empresas.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, empresas);

  } catch (error) {
    handleError(error, "empresa.controller -> getEmpresas");
    respondError(req, res, 500, "No se pudieron obtener las empresas");
  }
}

// Obtener empresa por ID
async function getEmpresaById(req, res) {
  try {
    const { id } = req.params;
    const { error: paramsError } = empresaIdSchema.validate({ id });
    if (paramsError) return respondError(req, res, 400, paramsError.message);
    const [empresa, errorEmpresa] = await EmpresaService.getEmpresaById(id);

    if (errorEmpresa) {
      return respondError(req, res, 404, errorEmpresa);
    }

    respondSuccess(req, res, 200, empresa);

  } catch (error) {
    handleError(error, "empresa.controller -> getEmpresaById");
    respondError(req, res, 500, "No se pudo obtener la empresa");
  }
}

// Crear empresa
async function createEmpresa(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = empresaBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);
    const [newEmpresa, errorEmpresa] = await EmpresaService.createEmpresa(body);
    console.log("errorEmpresa", errorEmpresa);
    if (errorEmpresa) {
      return respondError(req, res, 400, errorEmpresa);
    }

    if (!newEmpresa) {
      return respondError(req, res, 400, "No se creó la empresa");
    }

    respondSuccess(req, res, 201, newEmpresa);

  } catch (error) {
    handleError(error, "empresa.controller -> createEmpresa");
    respondError(req, res, 500, "No se pudo crear la empresa");
  }
}

// Actualizar empresa
async function updateEmpresa(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;
    const { error: paramsError } = empresaIdSchema.validate({ id });
    if (paramsError) return respondError(req, res, 400, paramsError.message);
    const { error: bodyError } = empresaBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);
    const [empresa, errorEmpresa] = await EmpresaService.updateEmpresa(id, body);

    if (errorEmpresa) {
      return respondError(req, res, 400, errorEmpresa);
    }

    respondSuccess(req, res, 200, empresa);

  } catch (error) {
    handleError(error, "empresa.controller -> updateEmpresa");
    respondError(req, res, 500, "No se pudo actualizar la empresa");
  }
}

// Eliminar empresa
async function deleteEmpresa(req, res) {
  try {
    const { id } = req.params;

    const [empresa, errorEmpresa] = await EmpresaService.deleteEmpresa(id);

    if (errorEmpresa) {
      return respondError(req, res, 404, errorEmpresa);
    }

    respondSuccess(req, res, 200, "Empresa eliminada exitosamente");

  } catch (error) {
    handleError(error, "empresa.controller -> deleteEmpresa");
    respondError(req, res, 500, "No se pudo eliminar la empresa");
  }
}

module.exports = {
  getEmpresas,
  getEmpresaById,
  createEmpresa,
  updateEmpresa,
  deleteEmpresa,
};
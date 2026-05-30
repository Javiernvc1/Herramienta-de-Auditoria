"use strict";

const ResultadoControl = require("../models/resultadoControl.model");
const Resultado = require("../models/resultado.model");
const Parametro = require("../models/parametro.model");

const { handleError } = require("../utils/errorHandler");

/**
 * Obtener todos los resultados de control
 */
async function getResultadosControl() {
  try {

    const resultadosControl = await ResultadoControl.findAll({
      include: [
        {
          model: Resultado,
          through: { attributes: [] },
          attributes: ["id_resultado", "fecha_ejecucion"]
        },
        {
          model: Parametro,
          through: { attributes: [] },
          attributes: [
            "id_parametro",
            "nombre",
            "valor_esperado"
          ]
        }
      ]
    });

    if (!resultadosControl || resultadosControl.length === 0) {
      return [null, "No hay resultados de control registrados"];
    }

    return [resultadosControl, null];

  } catch (error) {
    handleError(error, "resultadoControl.service -> getResultadosControl");
  }
}

/**
 * Obtener resultado de control por ID
 */
async function getResultadoControlById(id) {
  try {

    const resultadoControl = await ResultadoControl.findByPk(id, {
      include: [
        {
          model: Resultado,
          through: { attributes: [] },
          attributes: ["id_resultado", "fecha_ejecucion"]
        },
        {
          model: Parametro,
          through: { attributes: [] },
          attributes: [
            "id_parametro",
            "nombre",
            "valor_esperado"
          ]
        }
      ]
    });

    if (!resultadoControl) {
      return [null, "El resultado de control no existe"];
    }

    return [resultadoControl, null];

  } catch (error) {
    handleError(error, "resultadoControl.service -> getResultadoControlById");
  }
}

/**
 * Crear resultado de control
 */
async function createResultadoControl(data) {
  try {

    const {
      valor_obtenido,
      estado,
      resultados,
      parametros
    } = data;

    const newResultadoControl = await ResultadoControl.create({
      valor_obtenido,
      estado
    });

    // RESULTADOS
    if (resultados && resultados.length > 0) {

      const resultadosFound = await Resultado.findAll({
        where: {
          id_resultado: resultados
        }
      });

      await newResultadoControl.setResultados(resultadosFound);
    }

    // PARAMETROS
    if (parametros && parametros.length > 0) {

      const parametrosFound = await Parametro.findAll({
        where: {
          id_parametro: parametros
        }
      });

      await newResultadoControl.setParametros(parametrosFound);
    }

    return [newResultadoControl, null];

  } catch (error) {
    handleError(error, "resultadoControl.service -> createResultadoControl");
  }
}

/**
 * Actualizar resultado de control
 */
async function updateResultadoControl(id, data) {
  try {

    const {
      valor_obtenido,
      estado,
      resultados,
      parametros
    } = data;

    const resultadoControl = await ResultadoControl.findByPk(id);

    if (!resultadoControl) {
      return [null, "El resultado de control no existe"];
    }

    await resultadoControl.update({
      valor_obtenido,
      estado
    });

    // RESULTADOS
    if (resultados) {

      const resultadosFound = await Resultado.findAll({
        where: {
          id_resultado: resultados
        }
      });

      await resultadoControl.setResultados(resultadosFound);
    }

    // PARAMETROS
    if (parametros) {

      const parametrosFound = await Parametro.findAll({
        where: {
          id_parametro: parametros
        }
      });

      await resultadoControl.setParametros(parametrosFound);
    }

    return [resultadoControl, null];

  } catch (error) {
    handleError(error, "resultadoControl.service -> updateResultadoControl");
  }
}

/**
 * Eliminar resultado de control
 */
async function deleteResultadoControl(id) {
  try {

    const resultadoControl = await ResultadoControl.findByPk(id);

    if (!resultadoControl) {
      return [null, "El resultado de control no existe"];
    }

    await resultadoControl.destroy();

    return [resultadoControl, null];

  } catch (error) {
    handleError(error, "resultadoControl.service -> deleteResultadoControl");
  }
}

/**
 * Asociar parámetro
 */
async function assignParametro(resultadoControlId, parametroId) {
  try {

    const resultadoControl =
      await ResultadoControl.findByPk(resultadoControlId);

    if (!resultadoControl) {
      return [null, "El resultado de control no existe"];
    }

    const parametro = await Parametro.findByPk(parametroId);

    if (!parametro) {
      return [null, "El parámetro no existe"];
    }

    await resultadoControl.addParametro(parametro);

    return [resultadoControl, null];

  } catch (error) {
    handleError(error, "resultadoControl.service -> assignParametro");
  }
}

/**
 * Desasociar parámetro
 */
async function removeParametro(resultadoControlId, parametroId) {
  try {

    const resultadoControl =
      await ResultadoControl.findByPk(resultadoControlId);

    if (!resultadoControl) {
      return [null, "El resultado de control no existe"];
    }

    const parametro = await Parametro.findByPk(parametroId);

    if (!parametro) {
      return [null, "El parámetro no existe"];
    }

    await resultadoControl.removeParametro(parametro);

    return [resultadoControl, null];

  } catch (error) {
    handleError(error, "resultadoControl.service -> removeParametro");
  }
}

/**
 * Asociar resultado
 */
async function assignResultado(resultadoControlId, resultadoId) {
  try {

    const resultadoControl =
      await ResultadoControl.findByPk(resultadoControlId);

    if (!resultadoControl) {
      return [null, "El resultado de control no existe"];
    }

    const resultado = await Resultado.findByPk(resultadoId);

    if (!resultado) {
      return [null, "El resultado no existe"];
    }

    await resultadoControl.addResultado(resultado);

    return [resultadoControl, null];

  } catch (error) {
    handleError(error, "resultadoControl.service -> assignResultado");
  }
}

/**
 * Desasociar resultado
 */
async function removeResultado(resultadoControlId, resultadoId) {
  try {

    const resultadoControl =
      await ResultadoControl.findByPk(resultadoControlId);

    if (!resultadoControl) {
      return [null, "El resultado de control no existe"];
    }

    const resultado = await Resultado.findByPk(resultadoId);

    if (!resultado) {
      return [null, "El resultado no existe"];
    }

    await resultadoControl.removeResultado(resultado);

    return [resultadoControl, null];

  } catch (error) {
    handleError(error, "resultadoControl.service -> removeResultado");
  }
}

module.exports = {
  getResultadosControl,
  getResultadoControlById,
  createResultadoControl,
  updateResultadoControl,
  deleteResultadoControl,
  assignParametro,
  removeParametro,
  assignResultado,
  removeResultado
};
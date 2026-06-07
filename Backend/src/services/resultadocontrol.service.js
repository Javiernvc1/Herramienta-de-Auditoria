"use strict";

const ResultadoControl = require("../models/resultadoControl.model");
const Resultado = require("../models/resultado.model");
const Parametro = require("../models/parametro.model");
const Equipo = require("../models/equipo.model");

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
        },
        {
          model: Equipo,
          through: { attributes: [] },
          attributes: [
            "id_equipo",
            "nombreOS",
            "hostname",
            "ip",
            "tipo_conexion"
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
        },
        {
          model: Equipo,
          through: { attributes: [] },
          attributes: [
            "id_equipo",
            "nombreOS",
            "hostname",
            "ip",
            "tipo_conexion"
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
      parametros,
      equipos
    } = data;

    const newResultadoControl = await ResultadoControl.create({
      valor_obtenido,
      estado
    });

    if (resultados && resultados.length > 0) {
      const resultadosFound = await Resultado.findAll({
        where: {
          id_resultado: resultados
        }
      });

      await newResultadoControl.setResultados(resultadosFound);
    }

    if (parametros && parametros.length > 0) {
      const parametrosFound = await Parametro.findAll({
        where: {
          id_parametro: parametros
        }
      });

      await newResultadoControl.setParametros(parametrosFound);
    }

    if (equipos && equipos.length > 0) {
      const equiposFound = await Equipo.findAll({
        where: {
          id_equipo: equipos
        }
      });

      await newResultadoControl.setEquipos(equiposFound);
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
      parametros,
      equipos
    } = data;

    const resultadoControl = await ResultadoControl.findByPk(id);

    if (!resultadoControl) {
      return [null, "El resultado de control no existe"];
    }

    await resultadoControl.update({
      valor_obtenido,
      estado
    });

    if (resultados) {
      const resultadosFound = await Resultado.findAll({
        where: {
          id_resultado: resultados
        }
      });

      await resultadoControl.setResultados(resultadosFound);
    }

    if (parametros) {
      const parametrosFound = await Parametro.findAll({
        where: {
          id_parametro: parametros
        }
      });

      await resultadoControl.setParametros(parametrosFound);
    }

    if (equipos) {
      const equiposFound = await Equipo.findAll({
        where: {
          id_equipo: equipos
        }
      });

      await resultadoControl.setEquipos(equiposFound);
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

/**
 * Asociar equipo
 */
async function assignEquipo(resultadoControlId, equipoId) {
  try {
    const resultadoControl =
      await ResultadoControl.findByPk(resultadoControlId);

    if (!resultadoControl) {
      return [null, "El resultado de control no existe"];
    }

    const equipo = await Equipo.findByPk(equipoId);

    if (!equipo) {
      return [null, "El equipo no existe"];
    }

    await resultadoControl.addEquipo(equipo);

    return [resultadoControl, null];

  } catch (error) {
    handleError(error, "resultadoControl.service -> assignEquipo");
  }
}

/**
 * Desasociar equipo
 */
async function removeEquipo(resultadoControlId, equipoId) {
  try {
    const resultadoControl =
      await ResultadoControl.findByPk(resultadoControlId);

    if (!resultadoControl) {
      return [null, "El resultado de control no existe"];
    }

    const equipo = await Equipo.findByPk(equipoId);

    if (!equipo) {
      return [null, "El equipo no existe"];
    }

    await resultadoControl.removeEquipo(equipo);

    return [resultadoControl, null];

  } catch (error) {
    handleError(error, "resultadoControl.service -> removeEquipo");
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
  removeResultado,
  assignEquipo,
  removeEquipo
};
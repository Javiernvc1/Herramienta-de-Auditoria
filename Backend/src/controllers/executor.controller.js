"use strict";

const ExecutorService = require("../services/executor.service");

const {
  respondSuccess,
  respondError
} = require("../utils/resHandler");

const { handleError } = require("../utils/errorHandler");

/**
 * Ejecutar script
 */
async function executeScript(req, res) {
  try {

    const { id } = req.params;

    if (!id) {
      return respondError(
        req,
        res,
        400,
        "ID de script requerido"
      );
    }

    const [result, error] =
      await ExecutorService.executeScript(id);

    if (error) {
      return respondError(
        req,
        res,
        400,
        error
      );
    }

    return respondSuccess(
      req,
      res,
      200,
      result
    );

  } catch (error) {

    handleError(
      error,
      "executor.controller -> executeScript"
    );

    return respondError(
      req,
      res,
      500,
      "Error ejecutando script"
    );
  }
}

module.exports = {
  executeScript
};
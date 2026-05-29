"use strict";

const { ejecutarAuditoria } = require("../services/auditExecutor.service");

const { respondSuccess, respondError } = require("../utils/resHandler");

const { handleError } = require("../utils/errorHandler");

async function ejecutar(req, res) {

    try {

        const { id } = req.params;

        const [resultados, error] =
            await ejecutarAuditoria(id);

        if (error) {
            return respondError(req, res, 400, error);
        }

        respondSuccess(req, res, 200, resultados);

    } catch (error) {

        handleError(error, "auditExecutor.controller -> ejecutar");

        respondError(req, res, 500, "Error ejecutando auditoría");
    }
}

module.exports = {
    ejecutar
};
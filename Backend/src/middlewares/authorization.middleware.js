


"use strict";

const { respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler.js");

const verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRoles = req.user.roles;

      const hasRole = userRoles.some((role) =>
        allowedRoles.includes(role)
      );

      if (!hasRole) {
        return respondError(
          req,
          res,
          403,
          "Acceso denegado"
        );
      }

      next();
    } catch (error) {
      return respondError(
        req,
        res,
        500,
        "Error de autorización"
      );
    }
  };
};

module.exports = verifyRole;
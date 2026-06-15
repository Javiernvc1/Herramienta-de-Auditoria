"use strict";

const Joi = require("joi");

const nombreValido =
  /^(?=.*[A-Za-zÁÉÍÓÚáéíóúÑñ])[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s.&-]+$/;

const empresaBodySchema = Joi.object({

  nombre: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .pattern(nombreValido)
    .required()
    .messages({
      "string.empty": "El nombre de la empresa no puede estar vacío.",
      "any.required": "El nombre de la empresa es obligatorio.",
      "string.base": "El nombre de la empresa debe ser de tipo string.",
      "string.min": "El nombre de la empresa debe tener al menos 2 caracteres.",
      "string.max": "El nombre de la empresa no puede superar los 100 caracteres.",
      "string.pattern.base": "El nombre de la empresa debe contener letras y no puede ser solo numérico."
    })

}).messages({
  "object.unknown": "No se permiten propiedades adicionales."
});

const empresaIdSchema = Joi.object({

  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "El id debe ser numérico.",
      "number.integer": "El id debe ser un número entero.",
      "number.positive": "El id debe ser positivo.",
      "any.required": "El id es obligatorio."
    })

});

module.exports = {
  empresaBodySchema,
  empresaIdSchema
};
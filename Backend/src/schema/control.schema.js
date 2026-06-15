"use strict";

const Joi = require("joi");

const nombreValido =
  /^(?=.*[A-Za-zÁÉÍÓÚáéíóúÑñ])[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s._-]+$/;

const controlBodySchema = Joi.object({

  nombre: Joi.string()
    .trim()
    .min(2)
    .max(150)
    .pattern(nombreValido)
    .required()
    .messages({
      "string.empty": "El nombre del control no puede estar vacío.",
      "any.required": "El nombre del control es obligatorio.",
      "string.base": "El nombre del control debe ser de tipo string.",
      "string.min": "El nombre del control debe tener al menos 2 caracteres.",
      "string.max": "El nombre del control no puede superar los 150 caracteres.",
      "string.pattern.base": "El nombre del control debe contener letras y no puede ser solo numérico."
    })

}).messages({
  "object.unknown": "No se permiten propiedades adicionales."
});

const controlIdSchema = Joi.object({

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
  controlBodySchema,
  controlIdSchema
};
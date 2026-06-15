"use strict";

const Joi = require("joi");

const nombreValido =
  /^(?=.*[A-Za-zÁÉÍÓÚáéíóúÑñ])[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s._-]+$/;

const scriptBodySchema = Joi.object({

  nombre: Joi.string()
    .trim()
    .min(2)
    .max(150)
    .pattern(nombreValido)
    .required()
    .messages({
      "string.empty": "El nombre del script no puede estar vacío.",
      "any.required": "El nombre del script es obligatorio.",
      "string.base": "El nombre del script debe ser de tipo string.",
      "string.min": "El nombre del script debe tener al menos 2 caracteres.",
      "string.max": "El nombre del script no puede superar los 150 caracteres.",
      "string.pattern.base": "El nombre del script debe contener letras y no puede ser solo numérico."
    }),

  tipo: Joi.string()
    .trim()
    .lowercase()
    .valid("powershell", "bash")
    .required()
    .messages({
      "string.empty": "El tipo de script no puede estar vacío.",
      "any.required": "El tipo de script es obligatorio.",
      "any.only": "El tipo de script debe ser powershell o bash.",
      "string.base": "El tipo de script debe ser de tipo string."
    }),

  sistema_operativo: Joi.string()
    .trim()
    .lowercase()
    .valid("windows", "linux")
    .required()
    .messages({
      "string.empty": "El sistema operativo no puede estar vacío.",
      "any.required": "El sistema operativo es obligatorio.",
      "any.only": "El sistema operativo debe ser windows o linux.",
      "string.base": "El sistema operativo debe ser de tipo string."
    }),

  ruta: Joi.string()
    .trim()
    .min(3)
    .max(300)
    .optional()
    .messages({
      "string.base": "La ruta debe ser de tipo string.",
      "string.min": "La ruta debe tener al menos 3 caracteres.",
      "string.max": "La ruta no puede superar los 300 caracteres."
    }),

  comando: Joi.string()
    .trim()
    .min(2)
    .max(300)
    .required()
    .messages({
      "string.empty": "El comando no puede estar vacío.",
      "any.required": "El comando es obligatorio.",
      "string.base": "El comando debe ser de tipo string.",
      "string.min": "El comando debe tener al menos 2 caracteres.",
      "string.max": "El comando no puede superar los 300 caracteres."
    }),

    id_parametro: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "El parámetro asociado debe ser numérico.",
      "number.integer": "El parámetro asociado debe ser un número entero.",
      "number.positive": "El parámetro asociado debe ser positivo.",
      "any.required": "Debe seleccionar un parámetro asociado al script."
    })

}).messages({
  "object.unknown": "No se permiten propiedades adicionales."
});

const scriptIdSchema = Joi.object({

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
  scriptBodySchema,
  scriptIdSchema
};
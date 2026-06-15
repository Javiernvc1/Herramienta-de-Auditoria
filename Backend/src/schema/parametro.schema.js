"use strict";

const Joi = require("joi");

const textoValido =
  /^(?=.*[A-Za-zÁÉÍÓÚáéíóúÑñ])[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s.,;:_()/%#=-]+$/;

const parametroBodySchema = Joi.object({

  nombre: Joi.string()
    .trim()
    .min(2)
    .max(150)
    .pattern(textoValido)
    .required()
    .messages({
      "string.empty": "El nombre del parámetro no puede estar vacío.",
      "any.required": "El nombre del parámetro es obligatorio.",
      "string.base": "El nombre del parámetro debe ser de tipo string.",
      "string.min": "El nombre del parámetro debe tener al menos 2 caracteres.",
      "string.max": "El nombre del parámetro no puede superar los 150 caracteres.",
      "string.pattern.base": "El nombre del parámetro debe contener letras y no puede ser solo numérico."
    }),

  descripcion: Joi.string()
    .trim()
    .min(2)
    .max(500)
    .pattern(textoValido)
    .required()
    .messages({
      "string.empty": "La descripción no puede estar vacía.",
      "any.required": "La descripción es obligatoria.",
      "string.base": "La descripción debe ser de tipo string.",
      "string.min": "La descripción debe tener al menos 2 caracteres.",
      "string.max": "La descripción no puede superar los 500 caracteres.",
      "string.pattern.base": "La descripción debe contener letras y no puede ser solo numérica."
    }),

  valor_esperado: Joi.string()
    .trim()
    .min(1)
    .max(200)
    .pattern(textoValido)
    .required()
    .messages({
      "string.empty": "El valor esperado no puede estar vacío.",
      "any.required": "El valor esperado es obligatorio.",
      "string.base": "El valor esperado debe ser de tipo string.",
      "string.max": "El valor esperado no puede superar los 200 caracteres.",
      "string.pattern.base": "El valor esperado debe contener letras o una expresión válida."
    })

}).messages({
  "object.unknown": "No se permiten propiedades adicionales."
});

const parametroIdSchema = Joi.object({

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
  parametroBodySchema,
  parametroIdSchema
};
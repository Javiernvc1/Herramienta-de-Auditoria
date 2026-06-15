"use strict";

const Joi = require("joi");

const textoConLetras =
  /^(?=.*[A-Za-zÁÉÍÓÚáéíóúÑñ])[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s._-]+$/;

const equipoBodySchema = Joi.object({

  nombreOS: Joi.string()
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

  hostname: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .pattern(textoConLetras)
    .required()
    .messages({
      "string.empty": "El hostname no puede estar vacío.",
      "any.required": "El hostname es obligatorio.",
      "string.base": "El hostname debe ser de tipo string.",
      "string.min": "El hostname debe tener al menos 2 caracteres.",
      "string.max": "El hostname no puede superar los 100 caracteres.",
      "string.pattern.base": "El hostname debe contener letras y no puede ser solo numérico."
    }),

  ip: Joi.string()
    .trim()
    .ip({
      version: ["ipv4"]
    })
    .required()
    .messages({
      "string.empty": "La IP no puede estar vacía.",
      "any.required": "La IP es obligatoria.",
      "string.ip": "La IP debe tener formato IPv4 válido, por ejemplo 192.168.1.1",
      "string.base": "La IP debe ser de tipo string."
    }),

  tipo_conexion: Joi.string()
    .trim()
    .uppercase()
    .valid("LOCAL", "SSH")
    .required()
    .messages({
      "string.empty": "El tipo de conexión no puede estar vacío.",
      "any.required": "El tipo de conexión es obligatorio.",
      "any.only": "El tipo de conexión debe ser LOCAL o SSH.",
      "string.base": "El tipo de conexión debe ser de tipo string."
    }),

  ssh_usuario: Joi.when("tipo_conexion", {
    is: "SSH",
    then: Joi.string()
      .trim()
      .min(2)
      .max(100)
      .required()
      .messages({
        "string.empty": "El usuario SSH no puede estar vacío.",
        "any.required": "El usuario SSH es obligatorio para conexiones SSH.",
        "string.min": "El usuario SSH debe tener al menos 2 caracteres.",
        "string.max": "El usuario SSH no puede superar los 100 caracteres."
      }),
    otherwise: Joi.string()
      .allow("", null)
      .optional()
  }),

  ssh_password: Joi.when("tipo_conexion", {
    is: "SSH",
    then: Joi.string()
      .trim()
      .min(1)
      .max(150)
      .required()
      .messages({
        "string.empty": "La contraseña SSH no puede estar vacía.",
        "any.required": "La contraseña SSH es obligatoria para conexiones SSH.",
        "string.max": "La contraseña SSH no puede superar los 150 caracteres."
      }),
    otherwise: Joi.string()
      .allow("", null)
      .optional()
  }),

  ssh_puerto: Joi.when("tipo_conexion", {
    is: "SSH",
    then: Joi.number()
      .integer()
      .min(1)
      .max(65535)
      .required()
      .messages({
        "number.base": "El puerto SSH debe ser numérico.",
        "number.integer": "El puerto SSH debe ser un número entero.",
        "number.min": "El puerto SSH debe ser mayor o igual a 1.",
        "number.max": "El puerto SSH no puede ser mayor a 65535.",
        "any.required": "El puerto SSH es obligatorio para conexiones SSH."
      }),
    otherwise: Joi.number()
      .integer()
      .min(1)
      .max(65535)
      .allow(null)
      .optional()
  })

}).messages({
  "object.unknown": "No se permiten propiedades adicionales."
});

const equipoIdSchema = Joi.object({

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
  equipoBodySchema,
  equipoIdSchema
};
"use strict";

const Joi = require("joi");
const ROLES = require("../constants/roles.constants");

/**
 * Esquema de validación para el cuerpo de la solicitud de usuario.
 * @constant {Object}
 */
const userBodySchema = Joi.object({
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre de usuario no puede estar vacío.",
    "any.required": "El nombre de usuario es obligatorio.",
    "string.base": "El nombre de usuario debe ser de tipo string.",
  }),
  apellido: Joi.string().required().messages({
    "string.empty": "El apellido de usuario no puede estar vacío.",
    "any.required": "El apellido de usuario es obligatorio.",
    "string.base": "El apellido de usuario debe ser de tipo string.",
  }),
  password: Joi.string().required().min(5).messages({
    "string.empty": "La contraseña no puede estar vacía.",
    "any.required": "La contraseña es obligatoria.",
    "string.base": "La contraseña debe ser de tipo string.",
    "string.min": "La contraseña debe tener al menos 5 caracteres.",
  }),
  rut: Joi.string().required().messages({
    "string.empty": "El rut no puede estar vacío.",
    "any.required": "El rut es obligatorio.",
    "string.base": "El rut debe ser de tipo string.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "El email no puede estar vacío.",
    "any.required": "El email es obligatorio.",
    "string.base": "El email debe ser de tipo string.",
    "string.email": "El email debe tener un formato válido.",
  }),
  roleId: Joi.array()
    .items(Joi.string().valid(...ROLES))
    .required()
    .messages({
      "array.base": "El rol debe ser de tipo array.",
      "any.required": "El rol es obligatorio.",
      "string.base": "El rol debe ser de tipo string.",
      "any.only": "El rol proporcionado no es válido.",
    }),
  telefono: Joi.string().min(9).max(12).messages({
      "string.empty": "El teléfono no puede estar vacío.",
      "string.base": "El teléfono debe ser de tipo string.",
      "string.min": "El teléfono debe tener al menos 9 caracteres.",
      "string.max": "El teléfono debe tener máximo 12 caracteres.",
    })

  ,
  newPassword: Joi.string().min(5).messages({
    "string.empty": "La contraseña no puede estar vacía.",
    "string.base": "La contraseña debe ser de tipo string.",
    "string.min": "La contraseña debe tener al menos 5 caracteres.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de usuario.
 * @constant {Object}
 */
const userIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .messages({
      "string.empty": "El id no puede estar vacío.",
      "any.required": "El id es obligatorio.",
      "string.base": "El id debe ser de tipo string."
    }),
});

module.exports = { userBodySchema, userIdSchema };

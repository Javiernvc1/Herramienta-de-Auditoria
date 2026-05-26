"use strict";

/** Modulo 'jsonwebtoken' para crear tokens */
const jwt = require("jsonwebtoken");

const {
  ACCESS_JWT_SECRET,
  REFRESH_JWT_SECRET,
} = require("../config/configEnv.js");

const { handleError } = require("../utils/errorHandler");
const User = require("../models/user.model");
const Role = require("../models/role.model");
const bcrypt = require('bcryptjs');

async function comparePassword(userPassword, dbPassword) {
  return await bcrypt.compare(userPassword, dbPassword);
}
/**
 * Inicia sesión con un usuario.
 * @async
 * @function login
 * @param {Object} user - Objeto de usuario
 */
async function login(user) {
  console.log(user);
  try {
    const { email, password_hash } = user;

    const userFound = await User.findOne({
      where: { email }, include: {
        model: Role,
        attributes: ['name']
      }
    });
    //console.log(userFound);
    if (!userFound) {
      return [null, null, "El usuario y/o contraseña son incorrectos"];
    }

    // Aquí debes implementar tu propia función para comparar contraseñas
    const matchPassword = await comparePassword(password_hash, userFound.password_hash);
    //console.log(matchPassword, password_hash, userFound.password_hash);
    if (!matchPassword) {
      return [null, null, "El usuario y/o contraseña son incorrectos"];
    }

    //const roles = userFound.roles.map(role => role.name); 
    
    const roles = [userFound.Role.name];
    console.log(roles);
    const accessToken = jwt.sign(
      { id: userFound.id, email: userFound.email, roles },
      ACCESS_JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    const refreshToken = jwt.sign(
      { id: userFound.id, email: userFound.email, roles },
      REFRESH_JWT_SECRET,
      {
        expiresIn: "7d", // 7 días
      },
    );

    return [accessToken, refreshToken, null];
  } catch (error) {
    handleError(error, "auth.service -> signIn");
  }
}

/**
 * Refresca el token de acceso
 * @async
 * @function refresh
 * @param {Object} cookies - Objeto de cookies
 */
async function refresh(cookies) {
  try {
    if (!cookies.jwt) return [null, "No hay autorización"];
    const refreshToken = cookies.jwt;

    const accessToken = await jwt.verify(
      refreshToken,
      REFRESH_JWT_SECRET,
      async (err, user) => {
        if (err) return [null, "La sesion a caducado, vuelva a iniciar sesion"];

        const userFound = await User.findOne({ 
          where: { email: user.email },
          include: {
            model: Role,
            attributes: ['name']
          }
        });

        if (!userFound) {
          return [null, "No usuario no autorizado"];
        }

        const roles = userFound.roles.map(role => role.name);

        const accessToken = jwt.sign(
          { email: userFound.email, roles },
          ACCESS_JWT_SECRET,
          {
            expiresIn: "1d",
          },
        );

        return [accessToken, null];
      },
    );

    return accessToken;
  } catch (error) {
    handleError(error, "auth.service -> refresh");
  }
}

module.exports = {
  login,
  refresh,
};
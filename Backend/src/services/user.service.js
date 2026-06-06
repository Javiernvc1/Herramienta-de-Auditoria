"use strict";
const User = require("../models/user.model");
const Role = require("../models/role.model");
const { Op } = require("sequelize");
const { handleError } = require("../utils/errorHandler");
const bcrypt = require('bcryptjs');
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function getUsers() {
  try {
    const users = await User.findAll({
      attributes: ['id', 'nombre', 'apellido', 'email'],
      include: {
        model: Role,
        attributes: ['id' ,'name']
      }
    });

    if (!users) return [null, "No hay usuarios"];

    return [users, null];
  } catch (error) {
    handleError(error, "user.service -> getUsers");
  }
}

async function createUser(user) {
  try {
    const { nombre, apellido, email, password_hash, telefono, roleId } = user;

    const userFound = await User.findOne({ where: { email } });
    if (userFound) return [null, "El usuario ya existe"];

    const roleFound =
  await Role.findByPk(roleId);
    if (!roleFound) return [null, "El rol no existe"];

    
    const encryptedPassword = await hashPassword(password_hash);

    const newUser = await User.create({
      nombre,
      apellido,
      email,
      password_hash: encryptedPassword,
      roleId: roleFound.id
    });

    return [newUser, null];
  } catch (error) {
    handleError(error, "user.service -> createUser");
  }
}

async function getUserById(id) {
  console.log(id);
  try {
    const user = await User.findByPk(id, {
      attributes: ['id', 'nombre', 'apellido', 'email',  'roleId']
    });

    if (!user) return [null, "El usuario no existe"];

    return [user, null];
  } catch (error) {
    handleError(error, "user.service -> getUserById");
  }
}

const comparePassword = async (inputPassword, storedPassword) => {
  return await bcrypt.compare(inputPassword, storedPassword);
};

async function updateUser(id, user) {

  console.log(user);

  try {

    const {
      nombre,
      apellido,
      email,
      password_hash,
      newPassword,
      roleId
    } = user;

    const userFound =
      await User.findByPk(id);

    if (!userFound) {

      return [
        null,
        "El usuario no existe"
      ];
    }

    const matchPassword =
      await comparePassword(
        password_hash,
        userFound.password_hash
      );

    if (!matchPassword) {

      return [
        null,
        "La contraseña no coincide"
      ];
    }

    const roleFound =
      await Role.findByPk(roleId);

    if (!roleFound) {

      return [
        null,
        "El rol no existe"
      ];
    }

    const updateData = {

      nombre,

      apellido,

      email,

      roleId: roleFound.id
    };

    // Solo actualizar contraseña
    // si se ingresó una nueva

    if (
      newPassword &&
      newPassword.trim() !== ""
    ) {

      updateData.password_hash =
        await hashPassword(
          newPassword
        );
    }

    await userFound.update(
      updateData
    );

    return [
      userFound,
      null
    ];

  } catch (error) {

    handleError(
      error,
      "user.service -> updateUser"
    );
  }
}

async function deleteUser(id) {
  try {
    await User.destroy({ where: { id } });
    return [null, "Usuario eliminado exitosamente"];
  } catch (error) {
    handleError(error, "user.service -> deleteUser");
  }
}



async function getUserByRole(role) {
  try {
    const users = await User.findAll({
      where: {
        roleId: role
      }
    });

    if (!users) return [null, "No hay usuarios con ese rol"];

    return [users, null];
  } catch (error) {
    handleError(error, "user.service -> getUserByRole");
  }
}


module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserByRole
};
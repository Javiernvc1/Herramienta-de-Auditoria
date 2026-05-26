const { DataTypes } = require('sequelize');
const  sequelize  = require('../database/index.js');
const bcrypt = require('bcryptjs');


// Define el modelo 'User'
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
    model: 'roles',
    key: 'id'
  },
    },
  },
  {
    tableName: "users",
    timestamps: true,

  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password_hash = await bcrypt.hash(user.password_hash, salt);
    }
  }
});



module.exports = User;
const { DataTypes } = require("sequelize");
const  sequelize  = require('../database/index.js');

const Equipo = sequelize.define("Equipo", {
  id_equipo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  nombreOS: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hostname: {
    type: DataTypes.STRING,
    allowNull: false
  },

  ip: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "equipos",
  timestamps: false
});

module.exports = Equipo;
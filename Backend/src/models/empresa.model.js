const { DataTypes } = require("sequelize");
const  sequelize  = require('../database/index.js');

const Empresa = sequelize.define("Empresa", {
  id_empresa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "empresas",
  timestamps: false
});

module.exports = Empresa;
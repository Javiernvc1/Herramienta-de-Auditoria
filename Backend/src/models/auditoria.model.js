const { DataTypes } = require("sequelize");
const  sequelize  = require('../database/index.js');

const Auditoria = sequelize.define("Auditoria", {
  id_auditoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: "auditorias",
  timestamps: false
});

module.exports = Auditoria;
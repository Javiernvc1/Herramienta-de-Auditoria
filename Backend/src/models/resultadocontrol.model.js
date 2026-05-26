const { DataTypes } = require("sequelize");
const  sequelize  = require('../database/index.js');

const ResultadoControl = sequelize.define("ResultadoControl", {
  id_resultado_control: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  valor_obtenido: {
    type: DataTypes.STRING,
    allowNull: false
  },

  estado: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "resultado_controles",
  timestamps: false
});

module.exports = ResultadoControl;
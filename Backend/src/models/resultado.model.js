const { DataTypes } = require("sequelize");
const  sequelize  = require('../database/index.js');

const Resultado = sequelize.define("Resultado", {
  id_resultado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  fecha_ejecucion: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: "resultados",
  timestamps: false
});

module.exports = Resultado;
const { DataTypes } = require("sequelize");
const sequelize = require('../database/index.js');

const Parametro = sequelize.define("Parametro", {
  id_parametro: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },

  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  valor_esperado: {
    type: DataTypes.STRING,
    allowNull: false
  },

  id_control: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "controles",
      key: "id_control"
    }
  }

}, {
  tableName: "parametros",
  timestamps: false
});

module.exports = Parametro;

module.exports = Parametro;
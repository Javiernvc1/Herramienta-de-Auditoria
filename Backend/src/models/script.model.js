const { DataTypes } = require("sequelize");
const  sequelize  = require('../database/index.js');

const Script = sequelize.define("Script", {
  id_script: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },

  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },

  ruta: {
    type: DataTypes.STRING,
    allowNull: false
  },

  comando: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  id_parametro: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "parametros",
      key: "id_parametro"
    }
  }
}, {
  tableName: "scripts",
  timestamps: false
});

module.exports = Script;
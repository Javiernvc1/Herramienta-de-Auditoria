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
  sistema_operativo: {
    type: DataTypes.ENUM(
      "windows",
      "linux"
    ),
    allowNull: false
  },

  ruta: {
    type: DataTypes.STRING,
    allowNull: false
  },

  comando: {
    type: DataTypes.TEXT,
    allowNull: false
  }

}, {
  tableName: "scripts",
  timestamps: false
});

module.exports = Script;
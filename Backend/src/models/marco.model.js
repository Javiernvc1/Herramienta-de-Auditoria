const { DataTypes } = require("sequelize");
const  sequelize  = require('../database/index.js');

const Marco = sequelize.define("Marco", {
  id_marco: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "marcos",
  timestamps: false
});

module.exports = Marco;
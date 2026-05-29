const { DataTypes } = require("sequelize");
const  sequelize  = require('../database/index.js');

const Control = sequelize.define("Control", {
  id_control: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: "controles",
  timestamps: false
});

module.exports = Control;
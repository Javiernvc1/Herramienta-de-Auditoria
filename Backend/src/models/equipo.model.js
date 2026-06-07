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

  tipo_conexion: {
    type: DataTypes.ENUM("LOCAL", "SSH"),
    allowNull: false,
    defaultValue: "LOCAL"
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ssh_usuario: {
  type: DataTypes.STRING,
  allowNull: false
},
ssh_password: {
  type: DataTypes.STRING,
  allowNull: false
},
ssh_puerto: {
  type: DataTypes.INTEGER,
  allowNull: false
}
},  
{
  tableName: "equipos",
  timestamps: false
});

module.exports = Equipo;
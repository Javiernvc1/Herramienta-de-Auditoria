// configDB.js
"use strict";

const sequelize = require("../database/index.js");;
const { DB_USER, DB_PASSWORD, DB_NAME, HOST, DB_PORT } = require("./configEnv.js");
const { handleError } = require("../utils/errorHandler");

require("../models/role.model.js");
require("../models/user.model.js");
require('../models/relations.model.js');
require("../models/relations.model");



async function setupDB() {
  try {
    await sequelize.authenticate();
    console.log("=> Conectado a la base de datos");
    console.log(sequelize.models);
    await sequelize.sync({ alter: true }); 



    console.log('Database synced');
  } catch (err) {
    handleError(err, "/configDB.js -> setupDB");
  }
}

module.exports = { setupDB, sequelize };
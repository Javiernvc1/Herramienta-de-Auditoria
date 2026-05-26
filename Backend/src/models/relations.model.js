const User = require("./user.model");
const Empresa = require("./empresa.model");
const Equipo = require("./equipo.model");
const Auditoria = require("./auditoria.model");
const Marco = require("./marco.model");
const Control = require("./control.model");
const Parametro = require("./parametro.model");
const Script = require("./script.model");
const Resultado = require("./resultado.model");
const ResultadoControl = require("./resultadoControl.model");
const Role = require("./role.model");
// Relación Usuario -> Rol
User.belongsTo(Role, {
  foreignKey: "roleId"
});

Role.hasMany(User, {
  foreignKey: "roleId"
});

// USER - AUDITORIA
User.belongsToMany(Auditoria, {
  through: "realiza",
  foreignKey: "id_usuario"
});

Auditoria.belongsToMany(User, {
  through: "realiza",
  foreignKey: "id_auditoria"
});


// EMPRESA - AUDITORIA
Empresa.belongsToMany(Auditoria, {
  through: "solicita",
  foreignKey: "id_empresa"
});

Auditoria.belongsToMany(Empresa, {
  through: "solicita",
  foreignKey: "id_auditoria"
});


// AUDITORIA - MARCO
Auditoria.belongsToMany(Marco, {
  through: "utiliza",
  foreignKey: "id_auditoria"
});

Marco.belongsToMany(Auditoria, {
  through: "utiliza",
  foreignKey: "id_marco"
});


// MARCO - CONTROL
Marco.belongsToMany(Control, {
  through: "contiene",
  foreignKey: "id_marco"
});

Control.belongsToMany(Marco, {
  through: "contiene",
  foreignKey: "id_control"
});


// CONTROL - PARAMETRO
Control.belongsToMany(Parametro, {
  through: "define",
  foreignKey: "id_control"
});

Parametro.belongsToMany(Control, {
  through: "define",
  foreignKey: "id_parametro"
});


// PARAMETRO - SCRIPT
Parametro.belongsToMany(Script, {
  through: "ejecuta",
  foreignKey: "id_parametro"
});

Script.belongsToMany(Parametro, {
  through: "ejecuta",
  foreignKey: "id_script"
});


// EMPRESA - EQUIPO
Empresa.belongsToMany(Equipo, {
  through: "tiene",
  foreignKey: "id_empresa"
});

Equipo.belongsToMany(Empresa, {
  through: "tiene",
  foreignKey: "id_equipo"
});


// EQUIPO - RESULTADO
Equipo.belongsToMany(Resultado, {
  through: "obtiene",
  foreignKey: "id_equipo"
});

Resultado.belongsToMany(Equipo, {
  through: "obtiene",
  foreignKey: "id_resultado"
});


// AUDITORIA - RESULTADO
Auditoria.belongsToMany(Resultado, {
  through: "origina",
  foreignKey: "id_auditoria"
});

Resultado.belongsToMany(Auditoria, {
  through: "origina",
  foreignKey: "id_resultado"
});


// RESULTADO - RESULTADOCONTROL
Resultado.belongsToMany(ResultadoControl, {
  through: "genera",
  foreignKey: "id_resultado"
});

ResultadoControl.belongsToMany(Resultado, {
  through: "genera",
  foreignKey: "id_resultado_control"
});


// PARAMETRO - RESULTADOCONTROL
Parametro.belongsToMany(ResultadoControl, {
  through: "se_evalua",
  foreignKey: "id_parametro"
});

ResultadoControl.belongsToMany(Parametro, {
  through: "se_evalua",
  foreignKey: "id_resultado_control"
});
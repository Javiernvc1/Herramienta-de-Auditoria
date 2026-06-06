"use strict";

const Script = require("../models/script.model");
const Parametro = require("../models/parametro.model");
const Control = require("../models/control.model");
const Marco = require("../models/marco.model");
const fs = require("fs");
const path = require("path");

const { handleError } = require("../utils/errorHandler");

/**
 * Obtener todos los scripts
 */
async function getScripts() {
  try {
    const scripts = await Script.findAll({
      include: {
        model: Parametro,
        attributes: ["id_parametro", "nombre"]
      }
    });

    if (!scripts || scripts.length === 0) {
      return [null, "No hay scripts registrados"];
    }

    return [scripts, null];
  } catch (error) {
    handleError(error, "script.service -> getScripts");
  }
}

/**
 * Obtener script por ID
 */
async function getScriptById(id) {
  try {
    const script = await Script.findByPk(id, {
      include: {
        model: Parametro,
        attributes: ["id_parametro", "nombre"]
      }
    });

    if (!script) {
      return [null, "El script no existe"];
    }

    return [script, null];
  } catch (error) {
    handleError(error, "script.service -> getScriptById");
  }
}

/**
 * Crear script
 */
async function createScript(data, file) {

  try {

    const {
      nombre,
      tipo,
      comando,
      sistema_operativo,
      id_parametro
    } = data;

    const scriptFound =
      await Script.findOne({
        where: { nombre }
      });

    if (scriptFound) {

      return [
        null,
        "El script ya existe"
      ];
    }

    let rutaFinal = "";

    if (file && id_parametro) {

      const parametro =
        await Parametro.findByPk(
          id_parametro,
          {
            include: [
              {
                model: Control,
                include: [Marco]
              }
            ]
          }
        );

      if (!parametro) {

        return [
          null,
          "Parámetro no encontrado"
        ];
      }

      const control =
        parametro.Controls?.[0];

      const marco =
        control?.Marcos?.[0];

      if (!marco) {

        return [
          null,
          "No se encontró el marco asociado"
        ];
      }

      const nombreMarco =
        marco.nombre
          .replace(/\s+/g, "");

      const carpetaDestino =
        path.join(
          process.cwd(),
          "src",
          "scripts",
          "marcos",
          nombreMarco,
          sistema_operativo
        );

      fs.mkdirSync(
        carpetaDestino,
        { recursive: true }
      );

      const extension =
        path.extname(
          file.originalname
        );

      const nombreArchivo =
        file.originalname;

      const rutaDestino =
        path.join(
          carpetaDestino,
          nombreArchivo
        );

      fs.renameSync(
        file.path,
        rutaDestino
      );

      rutaFinal =
        path.relative(
          process.cwd(),
          rutaDestino
        )
        .replaceAll("\\", "/");
    }

    const newScript =
      await Script.create({

        nombre,

        tipo,

        comando,

        sistema_operativo,

        ruta: rutaFinal
      });
    if (id_parametro) {

  const parametro =
    await Parametro.findByPk(
      id_parametro
    );

  if (parametro) {

    await newScript.addParametro(
      parametro
    );
  }
}
    return [
      newScript,
      null
    ];

  } catch (error) {

    handleError(
      error,
      "script.service -> createScript"
    );
  }
}

/**
 * Actualizar script
 */
async function updateScript(id, data, file) {

  try {

    const {
      nombre,
      tipo,
      comando,
      sistema_operativo,
      id_parametro
    } = data;

    const script =
      await Script.findByPk(
        id,
        {
          include: {
            model: Parametro
          }
        }
      );

    if (!script) {

      return [
        null,
        "El script no existe"
      ];
    }

    let rutaFinal =
      script.ruta;

    /*
    Si viene archivo nuevo
    */
    if (file && id_parametro) {

      const parametro =
        await Parametro.findByPk(
          id_parametro,
          {
            include: [
              {
                model: Control,
                include: [Marco]
              }
            ]
          }
        );

      if (!parametro) {

        return [
          null,
          "Parámetro no encontrado"
        ];
      }

      const control =
        parametro.Controls?.[0];

      const marco =
        control?.Marcos?.[0];

      if (!marco) {

        return [
          null,
          "Marco no encontrado"
        ];
      }

      const nombreMarco =
        marco.nombre.replace(
          /\s+/g,
          ""
        );

      const carpetaDestino =
        path.join(
          process.cwd(),
          "src",
          "scripts",
          "marcos",
          nombreMarco,
          sistema_operativo
        );

      fs.mkdirSync(
        carpetaDestino,
        {
          recursive: true
        }
      );

      const rutaDestino =
        path.join(
          carpetaDestino,
          file.originalname
        );

      /*
      Borra archivo anterior
      */
      if (
        script.ruta &&
        fs.existsSync(
          path.join(
            process.cwd(),
            script.ruta
          )
        )
      ) {

        fs.unlinkSync(
          path.join(
            process.cwd(),
            script.ruta
          )
        );
      }

      fs.renameSync(
        file.path,
        rutaDestino
      );

      rutaFinal =
        path.relative(
          process.cwd(),
          rutaDestino
        )
        .replaceAll(
          "\\",
          "/"
        );
    }

    await script.update({

      nombre,

      tipo,

      comando,

      sistema_operativo,

      ruta: rutaFinal
    });

    /*
    Actualizar relación parámetro-script
    */
    if (id_parametro) {

      await script.setParametros([
        id_parametro
      ]);
    }

    return [
      script,
      null
    ];

  } catch (error) {

    handleError(
      error,
      "script.service -> updateScript"
    );
  }
}

/**
 * Eliminar script
 */
async function deleteScript(id) {
  try {
    const script = await Script.findByPk(id);

    if (!script) {
      return [null, "El script no existe"];
    }

    await script.destroy();

    return [script, null];
  } catch (error) {
    handleError(error, "script.service -> deleteScript");
  }
}

async function assignParametro(scriptId, parametroId) {
  try {
    const script = await Script.findByPk(scriptId);

    if (!script) {
      return [null, "El script no existe"];
    }

    const parametro = await Parametro.findByPk(parametroId);
    if (!parametro) {
      return [null, "El parámetro no existe"];
    }

    await script.addParametro(parametro);

    return [script, null];
  } catch (error) {
    handleError(error, "script.service -> assignParametro");
  }
}

async function removeParametro(scriptId, parametroId) {
  try {
    const script = await Script.findByPk(scriptId);

    if (!script) {
      return [null, "El script no existe"];
    }

    const parametro = await Parametro.findByPk(parametroId);
    if (!parametro) {
      return [null, "El parámetro no existe"];
    }

    await script.removeParametro(parametro);

    return [script, null];
  } catch (error) {
    handleError(error, "script.service -> removeParametro");
  }
}





module.exports = {
  getScripts,
  getScriptById,
  createScript,
  updateScript,
  deleteScript,
  assignParametro,
  removeParametro
};
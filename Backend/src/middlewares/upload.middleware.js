"use strict";

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ======================================
// CARPETA TEMPORAL
// ======================================

const uploadPath = path.join(
  __dirname,
  "..",
  "uploads"
);

if (!fs.existsSync(uploadPath)) {

  fs.mkdirSync(
    uploadPath,
    { recursive: true }
  );
}

// ======================================
// STORAGE
// ======================================

const storage =
  multer.diskStorage({

    destination:
      (req, file, cb) => {

        cb(
          null,
          uploadPath
        );
      },

    filename:
      (req, file, cb) => {

        const timestamp =
          Date.now();

        const extension =
          path.extname(
            file.originalname
          );

        const fileName =
          `${timestamp}${extension}`;

        cb(
          null,
          fileName
        );
      }
  });

// ======================================
// VALIDAR EXTENSIONES
// ======================================

const fileFilter =
  (req, file, cb) => {

    const extension =
      path.extname(
        file.originalname
      ).toLowerCase();

    const allowedExtensions = [
      ".ps1",
      ".sh"
    ];

    if (
      allowedExtensions.includes(
        extension
      )
    ) {

      cb(
        null,
        true
      );

    } else {

      cb(
        new Error(
          "Solo se permiten archivos .ps1 y .sh"
        ),
        false
      );
    }
  };

// ======================================
// CONFIGURACION
// ======================================

const upload = multer({

  storage,

  fileFilter,

  limits: {

    fileSize:
      5 * 1024 * 1024
  }
});

module.exports = upload;
"use strict";

const { Client } = require("ssh2");
const fs = require("fs");
const path = require("path");

/**
 * Ejecuta un script remotamente por SSH.
 * Recibe el objeto script completo y el equipo.
 */
async function executeScript(script, equipo) {

  try {

    const scriptPath =
      path.resolve(script.ruta);

    const scriptContent =
      fs.readFileSync(
        scriptPath,
        "utf8"
      );

    return new Promise((resolve) => {

      const conn =
        new Client();

      conn.on("ready", () => {

        console.log(
          `SSH conectado a ${equipo.hostname} (${equipo.ip})`
        );

        let command = "";

        if (
          script.sistema_operativo === "windows"
        ) {

          const scriptBase64 =
            Buffer
              .from(scriptContent, "utf8")
              .toString("base64");

          const psWrapper = `
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$script = [System.Text.Encoding]::UTF8.GetString(
  [System.Convert]::FromBase64String("${scriptBase64}")
)

Invoke-Expression $script
`;

          const encodedCommand =
            Buffer
              .from(psWrapper, "utf16le")
              .toString("base64");

          command =
            `powershell.exe -NoProfile -ExecutionPolicy Bypass -EncodedCommand ${encodedCommand}`;
        }

        else if (
          script.sistema_operativo === "linux"
        ) {

          const scriptBase64 =
            Buffer
              .from(scriptContent, "utf8")
              .toString("base64");

          command =
            `echo '${scriptBase64}' | base64 -d | bash`;
        }

        else {

          conn.end();

          return resolve([
            null,
            "Sistema operativo del script no soportado"
          ]);
        }

        console.log("===== COMANDO SSH =====");
        console.log(command);

        conn.exec(
          command,
          {
            pty: false
          },
          (err, stream) => {

            if (err) {

              conn.end();

              return resolve([
                null,
                err.message
              ]);
            }

            let stdout = "";
            let stderr = "";

            stream.on(
              "data",
              (data) => {
                stdout += data.toString("utf8");
              }
            );

            stream.stderr.on(
              "data",
              (data) => {
                stderr += data.toString("utf8");
              }
            );

            stream.on(
              "close",
              () => {

                conn.end();

                //console.log("===== STDOUT SSH =====");
                //console.log(stdout);

                //console.log("===== STDERR SSH =====");
                //console.log(stderr);

                if (
                  stderr &&
                  stderr.trim() !== "" &&
                  !stderr.includes("#< CLIXML")
                ) {
                  console.warn(stderr);
                }

                try {

                  if (
                    !stdout ||
                    stdout.trim() === ""
                  ) {

                    return resolve([
                      null,
                      "El script remoto no retornó datos"
                    ]);
                  }

                  const resultado =
                    JSON.parse(
                      stdout.trim()
                    );

                  console.log("Resultado SSH:");
                  console.log(resultado);

                  return resolve([
                    resultado,
                    null
                  ]);

                } catch (parseError) {

                  console.error(
                    "Error parseando JSON SSH:"
                  );

                  console.error(parseError);

                  console.error(
                    "Salida recibida:"
                  );

                  console.error(stdout);

                  return resolve([
                    null,
                    "Error parseando JSON SSH"
                  ]);
                }
              }
            );
          }
        );
      });

      conn.on(
        "error",
        (error) => {

          return resolve([
            null,
            error.message
          ]);
        }
      );

      conn.connect({

        host:
          equipo.ip,

        port:
          equipo.ssh_puerto || 22,

        username:
          equipo.ssh_usuario,

        password:
          equipo.ssh_password,

        readyTimeout:
          30000
      });
    });

  } catch (error) {

    return [
      null,
      error.message
    ];
  }
}

module.exports = {
  executeScript
};
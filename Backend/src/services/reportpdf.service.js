"use strict";

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");




const ReportService = require("./report.service");

const { handleError } = require("../utils/errorHandler");

function formatDate(date) {

    if (!date) return "N/A";

    return new Date(date).toLocaleString(
        "es-CL",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}

async function generarPDF(id_auditoria) {

    try {

        const [
            reporte,
            errorReporte
        ] =
            await ReportService.generarReporteAuditoria(
                id_auditoria
            );

        if (errorReporte) {
            return [null, errorReporte];
        }

        const nombreArchivo =
            `reporte_auditoria_${id_auditoria}_${Date.now()}.pdf`;

        const rutaPDF = path.join(
            process.cwd(),
            "uploads",
            nombreArchivo
        );

        const doc = new PDFDocument({
            size: "A4",
            margin: 50,
            bufferPages: true
        });


        const stream = fs.createWriteStream(
            rutaPDF
        );

        doc.pipe(stream);

        // =====================================
        // NUMERACIÓN DE PÁGINAS
        // =====================================

        let currentPage = 1;

        doc.on("pageAdded", () => {
            currentPage++;
        });

        // =====================================
        // PORTADA
        // =====================================

        doc.moveDown(6);

        doc
            .fontSize(24)
            .text(
                "SISTEMA DE AUDITORÍA INFORMÁTICA",
                {
                    align: "center"
                }
            );

        doc.moveDown(2);

        doc
            .fontSize(20)
            .text(
                "REPORTE DE AUDITORÍA",
                {
                    align: "center"
                }
            );

        doc.moveDown(3);

        doc.fontSize(14);

        doc.text(
            `Auditoría ID: ${reporte.auditoria.id_auditoria}`,
            { align: "center" }
        );

        doc.text(
            `Fecha Auditoría: ${formatDate(reporte.auditoria.fecha)}`,
            { align: "center" }
        );

        doc.text(
            `Fecha Ejecución: ${formatDate(reporte.auditoria.fecha_ejecucion)}`,
            { align: "center" }
        );

        doc.moveDown(2);

        doc.text(
            `Empresa: ${reporte.empresas
                .map(e => e.nombre)
                .join(", ")
            }`,
            { align: "center" }
        );

        doc.addPage();

        // =====================================
        // INFORMACIÓN GENERAL
        // =====================================

        doc
            .fontSize(18)
            .text("1. Información General");

        doc.moveDown();

        doc.fontSize(12);

        doc.text(
            `Auditoría ID: ${reporte.auditoria.id_auditoria}`
        );

        doc.text(
            `Fecha Auditoría: ${formatDate(reporte.auditoria.fecha)}`
        );

        doc.text(
            `Fecha Ejecución: ${formatDate(reporte.auditoria.fecha_ejecucion)}`
        );

        doc.moveDown();

        // =====================================
        // EMPRESAS
        // =====================================

        doc
            .fontSize(18)
            .text("2. Empresas");

        doc.moveDown(0.5);

        reporte.empresas.forEach((empresa) => {

            doc
                .fontSize(12)
                .text(`• ${empresa.nombre}`);
        });

        doc.moveDown();

        // =====================================
        // AUDITORES
        // =====================================

        doc
            .fontSize(18)
            .text("3. Auditores");

        doc.moveDown(0.5);

        reporte.auditores.forEach((auditor) => {

            doc
                .fontSize(12)
                .text(
                    `• ${auditor.nombre} ${auditor.apellido}`
                );
        });

        doc.moveDown();

        // =====================================
        // EQUIPOS
        // =====================================

        doc
            .fontSize(18)
            .text("4. Equipos Auditados");

        doc.moveDown(0.5);

        reporte.equipos.forEach((equipo) => {

            doc
                .fontSize(12)
                .text(
                    `• ${equipo.hostname} (${equipo.ip})`
                );
        });

        doc.moveDown();

        // =====================================
        // RESUMEN EJECUTIVO
        // =====================================

        doc
            .fontSize(18)
            .text("5. Resumen Ejecutivo");

        doc.moveDown();

        doc.fontSize(12);

        doc.text(
            `Controles Cumplen: ${reporte.metricas.cumple}`
        );

        doc.text(
            `Controles No Cumplen: ${reporte.metricas.no_cumple}`
        );

        doc.text(
            `Controles Informativos: ${reporte.metricas.informativos}`
        );

        doc.text(
            `Porcentaje de Cumplimiento: ${reporte.metricas.porcentaje_cumplimiento}%`
        );

        doc.moveDown();

        // =====================================
        // RESULTADOS
        // =====================================

        doc
            .fontSize(18)
            .text("6. Resultados Detallados");

        doc.moveDown();

        reporte.resultados.forEach((resultado) => {

            doc
                .fontSize(13)
                .text(
                    `${resultado.control}`,
                    { underline: true }
                );

            doc.moveDown(0.3);

            doc.fontSize(11);

            doc.text(
                `Marco: ${resultado.marco}`
            );

            doc.text(
                `Parámetro: ${resultado.parametro}`
            );

            doc.text(
                `Estado: ${resultado.estado}`
            );

            doc.text(
                `Valor Esperado: ${resultado.valor_esperado}`
            );

            doc.text(
                "Valor Obtenido:"
            );

            doc.text(
                resultado.valor_obtenido,
                {
                    width: 450
                }
            );

            doc.moveDown(0.5);

            doc
                .moveTo(50, doc.y)
                .lineTo(550, doc.y)
                .stroke();

            doc.moveDown();
        });

        // =====================================
        // CONCLUSIONES
        // =====================================

        doc.addPage();

        doc
            .fontSize(18)
            .text(
                "7. Conclusiones",
                {
                    align: "center"
                }
            );

        doc.moveDown(2);

        let conclusion = "";

        if (
            reporte.metricas.no_cumple === 0
        ) {

            conclusion =
                "No se detectaron incumplimientos en los controles evaluados durante la auditoría.";

        } else {

            conclusion =
                `Se detectaron ${reporte.metricas.no_cumple} controles que no cumplen con los criterios establecidos y requieren revisión.`;
        }

        doc
            .fontSize(12)
            .text(conclusion);

        doc.moveDown();

        doc.text(
            `El porcentaje de cumplimiento obtenido fue de ${reporte.metricas.porcentaje_cumplimiento}%.`
        );

        doc.moveDown();

        doc.text(
            "Este documento fue generado automáticamente por el Sistema de Auditoría Informática."
        );

        // =====================================
        // PIE DE PÁGINA
        // =====================================

        const pages = doc.bufferedPageRange();

        for (
            let i = 0;
            i < pages.count;
            i++
        ) {

            doc.switchToPage(i);

            doc.fontSize(10);

            doc.text(
                `Página ${i + 1} de ${pages.count}`,
                50,
                780,
                {
                    align: "center"
                }
            );
        }

        doc.end();

        await new Promise((resolve, reject) => {

            stream.on("finish", resolve);

            stream.on("error", reject);

        });
        return [
            {
                archivo: nombreArchivo,
                ruta: rutaPDF
            },
            null
        ];

    } catch (error) {

        handleError(
            error,
            "reportpdf.service -> generarPDF"
        );

        return [
            null,
            "Error generando PDF"
        ];
    }
}

module.exports = {
    generarPDF
};
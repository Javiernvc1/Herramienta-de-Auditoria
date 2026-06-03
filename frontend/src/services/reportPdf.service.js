import api from "./root.service";

export const generarPDF = async (idAuditoria) => {
  try {

    const response = await api.get(
      `/reportespdf/${idAuditoria}`,
      {
        responseType: "blob"
      }
    );

    const blob = new Blob(
      [response.data],
      {
        type: "application/pdf"
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `reporte_auditoria_${idAuditoria}.pdf`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

    return true;

  } catch (error) {

    console.error(
      "Error descargando PDF:",
      error
    );

    return false;
  }
};
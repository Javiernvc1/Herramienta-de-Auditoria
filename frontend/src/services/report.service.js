import api from "./root.service";

/**
 * Obtener reporte completo de una auditoría
 */
export const getReporteAuditoria = async (id) => {
  try {

    const response = await api.get(
      `/reportes/auditoria/${id}`
    );

    return response.data.data;

  } catch (error) {

    console.error(
      "Error obteniendo reporte:",
      error
    );

    throw error;
  }
};
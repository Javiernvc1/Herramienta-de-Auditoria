import api from "./root.service";

// Ejecutar auditoría
export const ejecutarAuditoria = async (id) => {
  try {

    const response = await api.post(
      `/auditexecutor/${id}`
    );

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
};
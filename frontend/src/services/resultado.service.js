import api from "./root.service";

// =====================================
// CRUD
// =====================================

export const getResultados = async () => {
  try {

    const response =
      await api.get("/resultados");

    return response.data.data;

  } catch (error) {

    console.error(
      "Error obteniendo resultados:",
      error
    );

    throw error;
  }
};

export const getResultadoById = async (id) => {
  try {

    const response =
      await api.get(`/resultados/${id}`);

    return response.data.data;

  } catch (error) {

    console.error(
      "Error obteniendo resultado:",
      error
    );

    throw error;
  }
};

export const createResultado = async (data) => {
  try {

    const response =
      await api.post(
        "/resultados",
        data
      );

    return response.data.data;

  } catch (error) {

    console.error(
      "Error creando resultado:",
      error
    );

    throw error;
  }
};

export const updateResultado = async (
  id,
  data
) => {
  try {

    const response =
      await api.put(
        `/resultados/${id}`,
        data
      );

    return response.data.data;

  } catch (error) {

    console.error(
      "Error actualizando resultado:",
      error
    );

    throw error;
  }
};

export const deleteResultado = async (id) => {
  try {

    const response =
      await api.delete(
        `/resultados/${id}`
      );

    return response.data.data;

  } catch (error) {

    console.error(
      "Error eliminando resultado:",
      error
    );

    throw error;
  }
};

// =====================================
// AUDITORÍAS
// =====================================

export const assignAuditoria = async (
  resultadoId,
  auditoriaId
) => {
  try {

    const response =
      await api.post(
        `/resultados/${resultadoId}/auditorias/${auditoriaId}`
      );

    return response.data.data;

  } catch (error) {

    console.error(
      "Error asignando auditoría:",
      error
    );

    throw error;
  }
};

export const removeAuditoria = async (
  resultadoId,
  auditoriaId
) => {
  try {

    const response =
      await api.delete(
        `/resultados/${resultadoId}/auditorias/${auditoriaId}`
      );

    return response.data.data;

  } catch (error) {

    console.error(
      "Error quitando auditoría:",
      error
    );

    throw error;
  }
};

// =====================================
// EQUIPOS
// =====================================

export const assignEquipo = async (
  resultadoId,
  equipoId
) => {
  try {

    const response =
      await api.post(
        `/resultados/${resultadoId}/equipos/${equipoId}`
      );

    return response.data.data;

  } catch (error) {

    console.error(
      "Error asignando equipo:",
      error
    );

    throw error;
  }
};

export const removeEquipo = async (
  resultadoId,
  equipoId
) => {
  try {

    const response =
      await api.delete(
        `/resultados/${resultadoId}/equipos/${equipoId}`
      );

    return response.data.data;

  } catch (error) {

    console.error(
      "Error quitando equipo:",
      error
    );

    throw error;
  }
};
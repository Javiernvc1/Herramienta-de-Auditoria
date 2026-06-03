import api from "./root.service";

// ===============================
// GET TODOS
// ===============================

export const getEquipos = async () => {
  try {
    const response = await api.get("/equipos");
    return response.data.data;
  } catch (error) {
    console.error("Error obteniendo equipos:", error);
    throw error;
  }
};

// ===============================
// GET POR ID
// ===============================

export const getEquipoById = async (id) => {
  try {
    const response = await api.get(`/equipos/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error obteniendo equipo:", error);
    throw error;
  }
};

// ===============================
// CREAR
// ===============================

export const createEquipo = async (equipo) => {
  try {
    const response = await api.post("/equipos", equipo);
    return response.data.data;
  } catch (error) {
    console.error("Error creando equipo:", error);
    throw error;
  }
};

// ===============================
// ACTUALIZAR
// ===============================

export const updateEquipo = async (id, equipo) => {
  try {
    const response = await api.put(
      `/equipos/${id}`,
      equipo
    );

    return response.data.data;
  } catch (error) {
    console.error("Error actualizando equipo:", error);
    throw error;
  }
};

// ===============================
// ELIMINAR
// ===============================

export const deleteEquipo = async (id) => {
  try {
    const response = await api.delete(
      `/equipos/${id}`
    );

    return response.data;
  } catch (error) {
    console.error("Error eliminando equipo:", error);
    throw error;
  }
};

// ===============================
// ASIGNAR EMPRESA
// ===============================

export const assignEmpresa = async (
  idEquipo,
  idEmpresa
) => {
  try {
    const response = await api.post(
      `/equipos/${idEquipo}/empresa/${idEmpresa}`
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Error asignando empresa al equipo:",
      error
    );

    throw error;
  }
};

// ===============================
// QUITAR EMPRESA
// ===============================

export const removeEmpresa = async (
  idEquipo,
  idEmpresa
) => {
  try {
    const response = await api.delete(
      `/equipos/${idEquipo}/empresa/${idEmpresa}`
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Error quitando empresa del equipo:",
      error
    );

    throw error;
  }
};
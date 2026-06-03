import api from "./root.service";

// ==========================================
// OBTENER TODAS LAS EMPRESAS
// ==========================================

export const getEmpresas = async () => {
  try {
    const response = await api.get("/empresas");

    return response.data.data;

  } catch (error) {

    console.error(
      "Error obteniendo empresas:",
      error
    );

    throw error;
  }
};

// ==========================================
// OBTENER EMPRESA POR ID
// ==========================================

export const getEmpresaById = async (id) => {
  try {
    const response =
      await api.get(`/empresas/${id}`);

    return response.data.data;

  } catch (error) {

    console.error(
      "Error obteniendo empresa:",
      error
    );

    throw error;
  }
};

// ==========================================
// CREAR EMPRESA
// ==========================================

export const createEmpresa = async (
  empresaData
) => {

  try {

    const response =
      await api.post(
        "/empresas",
        empresaData
      );

    return response.data.data;

  } catch (error) {

    console.error(
      "Error creando empresa:",
      error
    );

    throw error;
  }
};

// ==========================================
// ACTUALIZAR EMPRESA
// ==========================================

export const updateEmpresa = async (
  id,
  empresaData
) => {

  try {

    const response =
      await api.put(
        `/empresas/${id}`,
        empresaData
      );

    return response.data.data;

  } catch (error) {

    console.error(
      "Error actualizando empresa:",
      error
    );

    throw error;
  }
};

// ==========================================
// ELIMINAR EMPRESA
// ==========================================

export const deleteEmpresa = async (id) => {

  try {

    const response =
      await api.delete(
        `/empresas/${id}`
      );

    return response.data;

  } catch (error) {

    console.error(
      "Error eliminando empresa:",
      error
    );

    throw error;
  }
};
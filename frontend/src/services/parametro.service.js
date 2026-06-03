import axios from "./root.service";

/**
 * Obtener todos los parámetros
 */
export async function getParametros() {

  try {

    const response =
      await axios.get("/parametros");

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Obtener parámetro por ID
 */
export async function getParametroById(id) {

  try {

    const response =
      await axios.get(`/parametros/${id}`);

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Crear parámetro
 */
export async function createParametro(data) {

  try {

    const response =
      await axios.post(
        "/parametros",
        data
      );

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Actualizar parámetro
 */
export async function updateParametro(
  id,
  data
) {

  try {

    const response =
      await axios.put(
        `/parametros/${id}`,
        data
      );

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Eliminar parámetro
 */
export async function deleteParametro(id) {

  try {

    const response =
      await axios.delete(
        `/parametros/${id}`
      );

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Asociar parámetro a control
 */
export async function assignControl(
  parametroId,
  controlId
) {

  try {

    const response =
      await axios.post(
        `/parametros/${parametroId}/controles/${controlId}`
      );

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Quitar parámetro de control
 */
export async function removeControl(
  parametroId,
  controlId
) {

  try {

    const response =
      await axios.delete(
        `/parametros/${parametroId}/controles/${controlId}`
      );

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}
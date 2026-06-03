import axios from "./root.service";

/**
 * Obtener todos los marcos
 */
export async function getMarcos() {

  try {

    const response =
      await axios.get("/marcos");

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Obtener marco por ID
 */
export async function getMarcoById(id) {

  try {

    const response =
      await axios.get(`/marcos/${id}`);

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Crear marco
 */
export async function createMarco(data) {

  try {

    const response =
      await axios.post(
        "/marcos",
        data
      );

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Actualizar marco
 */
export async function updateMarco(
  id,
  data
) {

  try {

    const response =
      await axios.put(
        `/marcos/${id}`,
        data
      );

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Eliminar marco
 */
export async function deleteMarco(id) {

  try {

    const response =
      await axios.delete(
        `/marcos/${id}`
      );

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}
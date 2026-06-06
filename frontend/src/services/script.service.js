import axios from "./root.service";

/**
 * Obtener todos los scripts
 */
export async function getScripts() {

  try {

    const response =
      await axios.get("/scripts");

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Obtener script por ID
 */
export async function getScriptById(id) {

  try {

    const response =
      await axios.get(`/scripts/${id}`);

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Crear script
 */
export async function createScript(data) {

  try {

    const formData =
      new FormData();

    Object.keys(data).forEach(
      (key) => {

        if (
          data[key] !== null &&
          data[key] !== undefined
        ) {

          formData.append(
            key,
            data[key]
          );
        }
      }
    );

    const response =
      await axios.post(
        "/scripts",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Actualizar script
 */
export async function updateScript(
  id,
  data
) {

  try {

    const formData =
      new FormData();

    Object.keys(data).forEach(
      (key) => {

        if (
          data[key] !== null &&
          data[key] !== undefined
        ) {

          formData.append(
            key,
            data[key]
          );
        }
      }
    );

    const response =
      await axios.put(
        `/scripts/${id}`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Eliminar script
 */
export async function deleteScript(id) {

  try {

    const response =
      await axios.delete(
        `/scripts/${id}`
      );

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Asociar script a parámetro
 */
export async function assignParametro(
  scriptId,
  parametroId
) {

  try {

    const response =
      await axios.post(
        `/scripts/${scriptId}/parametros/${parametroId}`
      );

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Quitar script de parámetro
 */
export async function removeParametro(
  scriptId,
  parametroId
) {

  try {

    const response =
      await axios.delete(
        `/scripts/${scriptId}/parametros/${parametroId}`
      );

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}
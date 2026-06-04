import axios from "./root.service";

/**
 * Obtener todos los controles
 */
export async function getControles() {

  try {

    const response =
      await axios.get("/controles");

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Obtener control por ID
 */
export async function getControlById(id) {

  try {

    const response =
      await axios.get(`/controles/${id}`);

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Crear control
 */
export async function createControl(data) {

  try {

    const response =
      await axios.post(
        "/controles",
        data
      );

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Actualizar control
 */
export async function updateControl(
  id,
  data
) {

  try {

    const response =
      await axios.put(
        `/controles/${id}`,
        data
      );

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Eliminar control
 */
export async function deleteControl(id) {

  try {

    const response =
      await axios.delete(
        `/controles/${id}`
      );

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Asociar marco a control
 */
export async function assignMarco(
  controlId,
  marcoId
) {

  try {

    const response =
      await axios.post(
        `/controles/${controlId}/marcos/${marcoId}`
      );

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Quitar marco de control
 */
export async function removeMarco(
  controlId,
  marcoId
) {

  try {

    const response =
      await axios.delete(
        `/controles/${controlId}/marcos/${marcoId}`
      );

    return response.data.data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Cambiar marco asociado
 */
export async function changeMarco(
  controlId,
  oldMarcoId,
  newMarcoId
) {

  try {

    if (
      Number(oldMarcoId) ===
      Number(newMarcoId)
    ) {

      return true;
    }

    await removeMarco(
      controlId,
      oldMarcoId
    );

    await assignMarco(
      controlId,
      newMarcoId
    );

    return true;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/**
 * Crear control y asociarlo
 * inmediatamente a un marco
 */
export async function createControlWithMarco(
  nombre,
  marcoId
) {

  try {

    const control =
      await createControl({
        nombre
      });

    await assignMarco(
      control.id_control,
      marcoId
    );

    return control;

  } catch (error) {

    console.error(error);

    throw error;
  }
}
import api from "./root.service";

// ===============================
// GET TODOS LOS USUARIOS
// ===============================

export const getUsers = async () => {

  try {

    const response =
      await api.get("/users");

    return response.data.data;

  } catch (error) {

    console.error(
      "Error obteniendo usuarios:",
      error
    );

    throw error;
  }
};

// ===============================
// GET USUARIO POR ID
// ===============================

export const getUserById = async (id) => {

  try {

    const response =
      await api.get(`/users/${id}`);

    return response.data.data;

  } catch (error) {

    console.error(
      "Error obteniendo usuario:",
      error
    );

    throw error;
  }
};

// ===============================
// GET USUARIOS POR ROL
// ===============================

export const getUsersByRole = async (
  role
) => {

  try {

    const response =
      await api.get(
        `/users/role/${role}`
      );

    return response.data.data;

  } catch (error) {

    console.error(
      "Error obteniendo usuarios por rol:",
      error
    );

    throw error;
  }
};

// ===============================
// CREAR USUARIO
// ===============================

export const createUser = async (
  userData
) => {
  console.log("Creando usuario con datos:", userData);
  try {

    const response =
      await api.post(
        "/users",
        userData
      );

    return response.data.data;

  } catch (error) {

    console.error(
      "Error creando usuario:",
      error
    );

    throw error;
  }
};

// ===============================
// ACTUALIZAR USUARIO
// ===============================

export const updateUser = async (
  id,
  userData
) => {

  try {

    const response =
      await api.put(
        `/users/${id}`,
        userData
      );

    return response.data.data;

  } catch (error) {

    console.error(
      "Error actualizando usuario:",
      error
    );

    throw error;
  }
};

// ===============================
// ELIMINAR USUARIO
// ===============================

export const deleteUser = async (
  id
) => {

  try {

    const response =
      await api.delete(
        `/users/${id}`
      );

    return response.data.data;

  } catch (error) {

    console.error(
      "Error eliminando usuario:",
      error
    );

    throw error;
  }
};
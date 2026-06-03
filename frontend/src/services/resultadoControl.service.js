import api from "./root.service";

// ============================
// CRUD
// ============================

export const getResultadosControl = async () => {
  const { data } = await api.get("/resultadoscontrol");
  return data.data;
};

export const getResultadoControlById = async (id) => {
  const { data } = await api.get(`/resultadoscontrol/${id}`);
  return data.data;
};

export const createResultadoControl = async (resultadoControl) => {
  const { data } = await api.post(
    "/resultadoscontrol",
    resultadoControl
  );

  return data.data;
};

export const updateResultadoControl = async (
  id,
  resultadoControl
) => {
  const { data } = await api.put(
    `/resultadoscontrol/${id}`,
    resultadoControl
  );

  return data.data;
};

export const deleteResultadoControl = async (id) => {
  const { data } = await api.delete(
    `/resultadoscontrol/${id}`
  );

  return data.data;
};

// ============================
// PARAMETROS
// ============================

export const assignParametro = async (
  idResultadoControl,
  idParametro
) => {
  const { data } = await api.post(
    `/resultadoscontrol/${idResultadoControl}/parametro/${idParametro}`
  );

  return data.data;
};

export const removeParametro = async (
  idResultadoControl,
  idParametro
) => {
  const { data } = await api.delete(
    `/resultadoscontrol/${idResultadoControl}/parametro/${idParametro}`
  );

  return data.data;
};

// ============================
// RESULTADOS
// ============================

export const assignResultado = async (
  idResultadoControl,
  idResultado
) => {
  const { data } = await api.post(
    `/resultadoscontrol/${idResultadoControl}/resultado/${idResultado}`
  );

  return data.data;
};

export const removeResultado = async (
  idResultadoControl,
  idResultado
) => {
  const { data } = await api.delete(
    `/resultadoscontrol/${idResultadoControl}/resultado/${idResultado}`
  );

  return data.data;
};
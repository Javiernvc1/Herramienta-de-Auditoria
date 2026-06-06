import api from "./root.service";

// ============================
// CRUD
// ============================

export const getResultadosControl = async () => {
  const { data } = await api.get("/resultados-control");
  return data.data;
};

export const getResultadoControlById = async (id) => {
  const { data } = await api.get(`/resultados-control/${id}`);
  return data.data;
};

export const createResultadoControl = async (resultadoControl) => {
  const { data } = await api.post(
    "/resultados-control",
    resultadoControl
  );

  return data.data;
};

export const updateResultadoControl = async (
  id,
  resultadoControl
) => {
  const { data } = await api.put(
    `/resultados-control/${id}`,
    resultadoControl
  );

  return data.data;
};

export const deleteResultadoControl = async (id) => {
  const { data } = await api.delete(
    `/resultados-control/${id}`
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
    `/resultados-control/${idResultadoControl}/parametro/${idParametro}`
  );

  return data.data;
};

export const removeParametro = async (
  idResultadoControl,
  idParametro
) => {
  const { data } = await api.delete(
    `/resultados-control/${idResultadoControl}/parametro/${idParametro}`
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
    `/resultados-control/${idResultadoControl}/resultado/${idResultado}`
  );

  return data.data;
};

export const removeResultado = async (
  idResultadoControl,
  idResultado
) => {
  const { data } = await api.delete(
    `/resultados-control/${idResultadoControl}/resultado/${idResultado}`
  );

  return data.data;
};
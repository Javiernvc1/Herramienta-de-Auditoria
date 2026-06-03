import api from "./root.service";

// =========================
// CRUD
// =========================

export const getAuditorias = async () => {
  const response = await api.get("/auditorias");
  return response.data.data;
};

export const getAuditoriaById = async (id) => {
  const response = await api.get(`/auditorias/${id}`);
  return response.data.data;
};

export const createAuditoria = async (data) => {
  const response = await api.post("/auditorias", data);
  return response.data.data;
};

export const updateAuditoria = async (id, data) => {
  const response = await api.put(`/auditorias/${id}`, data);
  return response.data.data;
};

export const deleteAuditoria = async (id) => {
  const response = await api.delete(`/auditorias/${id}`);
  return response.data.data;
};

// =========================
// EMPRESAS
// =========================

export const assignEmpresa = async (
  auditoriaId,
  empresaId
) => {
  const response = await api.post(
    `/auditorias/${auditoriaId}/empresa/${empresaId}`
  );

  return response.data.data;
};

export const removeEmpresa = async (
  auditoriaId,
  empresaId
) => {
  const response = await api.delete(
    `/auditorias/${auditoriaId}/empresa/${empresaId}`
  );

  return response.data.data;
};

// =========================
// USUARIOS (AUDITORES)
// =========================

export const assignUser = async (
  auditoriaId,
  userId
) => {
  const response = await api.post(
    `/auditorias/${auditoriaId}/usuario/${userId}`
  );

  return response.data.data;
};

export const removeUser = async (
  auditoriaId,
  userId
) => {
  const response = await api.delete(
    `/auditorias/${auditoriaId}/usuario/${userId}`
  );

  return response.data.data;
};

// =========================
// MARCOS
// =========================

export const assignMarco = async (
  auditoriaId,
  marcoId
) => {
  const response = await api.post(
    `/auditorias/${auditoriaId}/marco/${marcoId}`
  );

  return response.data.data;
};

export const removeMarco = async (
  auditoriaId,
  marcoId
) => {
  const response = await api.delete(
    `/auditorias/${auditoriaId}/marco/${marcoId}`
  );

  return response.data.data;
};
import API from "./axios";

export const getSaasApps = () => {
  return API.get("/saas-apps");
};

export const getSaasAppById = (id) => {
  return API.get(`/saas-apps/${id}`);
};

export const createSaasApp = (data) => {
  return API.post("/saas-apps", data);
};

export const updateSaasApp = (id, data) => {
  return API.put(`/saas-apps/${id}`, data);
};

export const deleteSaasApp = (id) => {
  return API.delete(`/saas-apps/${id}`);
};
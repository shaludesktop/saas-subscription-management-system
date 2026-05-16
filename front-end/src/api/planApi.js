import API from "./axios";

export const getPlans = () => {
  return API.get("/plans");
};

export const getPlansByApp = (appId) => {
  return API.get(`/plans/app/${appId}`);
};

export const createPlan = (data) => {
  return API.post("/plans", data);
};

export const updatePlan = (id, data) => {
  return API.put(`/plans/${id}`, data);
};

export const deletePlan = (id) => {
  return API.delete(`/plans/${id}`);
};
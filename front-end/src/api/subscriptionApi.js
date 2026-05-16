import API from "./axios";

export const getMySubscriptions = () => {
  return API.get("/subscriptions/my");
};

export const getAllSubscriptions = () => {
  return API.get("/subscriptions");
};

export const createSubscription = (data) => {
  return API.post("/subscriptions", data);
};

export const renewSubscription = (id) => {
  return API.put(`/subscriptions/${id}/renew`);
};

export const upgradeSubscription = (id, data) => {
  return API.put(`/subscriptions/${id}/upgrade`, data);
};

export const downgradeSubscription = (id, data) => {
  return API.put(`/subscriptions/${id}/downgrade`, data);
};

export const cancelSubscription = (id) => {
  return API.put(`/subscriptions/${id}/cancel`);
};
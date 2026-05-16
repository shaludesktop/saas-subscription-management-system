import API from "./axios";

export const registerUser = (formData) => {
  return API.post("/auth/register", formData);
};

export const loginUser = (formData) => {
  return API.post("/auth/login", formData);
};
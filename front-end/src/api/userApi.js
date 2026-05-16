import API from "./axios";

export const getUserProfile = () => {
  return API.get("/users/profile");
};

export const updateUserProfile = (data) => {
  return API.put("/users/profile", data);
};

export const getAllUsers = () => {
  return API.get("/users");
};
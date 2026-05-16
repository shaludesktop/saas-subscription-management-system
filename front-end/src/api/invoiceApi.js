import API from "./axios";

export const getMyInvoices = () => {
  return API.get("/invoices/my");
};

export const getAllInvoices = () => {
  return API.get("/invoices");
};
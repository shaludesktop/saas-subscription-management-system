import API from "./axios";

/* Create normal payment */
export const createPayment = (data) => {
  return API.post("/payments", data);
};

/* Razorpay Order Creation */
export const createRazorpayOrder = (data) => {
  return API.post("/payments/create-order", data);
};

/* Razorpay Payment Verification */
export const verifyRazorpayPayment = (data) => {
  return API.post("/payments/verify", data);
};

/* User Payments */
export const getMyPayments = () => {
  return API.get("/payments/my");
};

/* Admin Payments */
export const getAllPayments = () => {
  return API.get("/payments/all");
};
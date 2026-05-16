import express from "express";

import {
  createPayment,
  getMyPayments,
  getAllPayments,
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../controllers/paymentController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/* Normal Payment */
router.post("/", protect, createPayment);

/* Razorpay */
router.post("/create-order", protect, createRazorpayOrder);

router.post("/verify", protect, verifyRazorpayPayment);

/* User Payments */
router.get("/my", protect, getMyPayments);

/* Admin Payments */
router.get("/all", protect, getAllPayments);

export default router;
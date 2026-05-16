import express from "express";
import { createInvoice, getMyInvoices, getAllInvoices } from "../controllers/invoiceController.js";
import  protect  from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createInvoice);
router.get("/my", protect, getMyInvoices);
router.get("/", protect, adminOnly, getAllInvoices);

export default router;
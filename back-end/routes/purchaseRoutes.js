import express from "express";
import { purchasePlan } from "../controllers/planPurchaseController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, purchasePlan);

export default router;
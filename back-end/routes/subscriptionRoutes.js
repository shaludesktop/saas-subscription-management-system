import express from "express";
import {
  getMySubscriptions,
  createSubscription,
  renewSubscription,
  upgradeSubscription,
  downgradeSubscription,
  cancelSubscription,
  getAllSubscriptions,
} from "../controllers/subscriptionController.js";
import  protect  from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/my", protect, getMySubscriptions);
router.get("/", protect, adminOnly, getAllSubscriptions);
router.post("/", protect, createSubscription);
router.put("/:id/renew", protect, renewSubscription);
router.put("/:id/upgrade", protect, upgradeSubscription);
router.put("/:id/downgrade", protect, downgradeSubscription);
router.put("/:id/cancel", protect, cancelSubscription);

export default router;
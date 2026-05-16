import express from "express";
import {
  getPlans,
  getPlansByApp,
  createPlan,
  updatePlan,
  deletePlan,
} from "../controllers/planController.js";
import protect from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getPlans);
router.get("/app/:appId", getPlansByApp);
router.post("/", protect, adminOnly, createPlan);
router.put("/:id", protect, adminOnly, updatePlan);
router.delete("/:id", protect, adminOnly, deletePlan);

export default router;
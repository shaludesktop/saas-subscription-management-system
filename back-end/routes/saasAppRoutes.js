import express from "express";
import {
  getSaasApps,
  getSaasAppById,
  createSaasApp,
  updateSaasApp,
  deleteSaasApp,
} from "../controllers/saasAppController.js";
import  protect  from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getSaasApps);
router.get("/:id", getSaasAppById);
router.post("/", protect, adminOnly, createSaasApp);
router.put("/:id", protect, adminOnly, updateSaasApp);
router.delete("/:id", protect, adminOnly, deleteSaasApp);

export default router;
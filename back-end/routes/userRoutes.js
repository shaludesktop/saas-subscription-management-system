import express from "express";
import { getUserProfile, updateUserProfile, getUsers } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.get("/", protect, adminOnly, getUsers);

export default router;
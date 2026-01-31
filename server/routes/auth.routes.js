import express from "express";
import {
  getAdminProfile,
  loginAdmin,
  logoutAdmin,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/me", protect, getAdminProfile);

export default router;

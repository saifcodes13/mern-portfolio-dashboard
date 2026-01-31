import express from "express";

import {
  getProjects,
  getProjectById,
  updateProject,
  createProject,
  deleteProject,
} from "../controllers/project.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").get(getProjects);

router.post("/create", protect, createProject);
router.route("/:id").get(protect, getProjectById);
router.put("/:id", protect, updateProject);
router.delete("/:id",protect, deleteProject);

export default router;

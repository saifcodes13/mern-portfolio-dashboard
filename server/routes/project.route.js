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

router.post("/create",  createProject);
router.route("/:id").get( getProjectById);
router.put("/:id",  updateProject);
router.delete("/:id", deleteProject);

export default router;

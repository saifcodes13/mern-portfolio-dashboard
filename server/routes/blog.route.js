import express from "express";
import {
  getBlogs,
  getBlogByIdOrSlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", getBlogByIdOrSlug);
router.post("/create", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;

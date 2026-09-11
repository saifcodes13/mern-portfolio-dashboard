import mongoose from "mongoose";
import BlogModel from "../models/blog.model.js";
import { blogs as defaultBlogs } from "../data/blogs.data.js";

// GET /api/blogs
export const getBlogs = async (req, res) => {
  try {
    let blogs = await BlogModel.find().sort({ createdAt: -1 });
    if (blogs.length === 0) {
      // Auto-populate collection if empty
      try {
        const formatted = defaultBlogs.map(({ id, ...rest }) => rest);
        blogs = await BlogModel.insertMany(formatted);
      } catch (insertErr) {
        return res.json(defaultBlogs);
      }
    }
    res.json(blogs);
  } catch (error) {
    // Return fallback sample blogs if database is temporarily unreachable
    res.json(defaultBlogs);
  }
};

// GET /api/blogs/:id
export const getBlogByIdOrSlug = async (req, res) => {
  try {
    const { id } = req.params;
    let blog = null;

    // Try find by MongoDB ObjectId
    if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await BlogModel.findById(id);
    }

    // If not found, try find by slug
    if (!blog) {
      blog = await BlogModel.findOne({ slug: id });
    }

    if (!blog) {
      // Check fallback data
      const fallback = defaultBlogs.find(
        (b) => b.id === id || b.slug === id
      );
      if (fallback) return res.json(fallback);
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/blogs
export const createBlog = async (req, res) => {
  try {
    const data = { ...req.body };
    if (!data.slug && data.title) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
    const newBlog = new BlogModel(data);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /api/blogs/:id
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    let blog = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      blog = await BlogModel.findById(id);
    }
    if (!blog) {
      blog = await BlogModel.findOne({ $or: [{ id }, { slug: id }] });
    }
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    blog.title = req.body.title || blog.title;
    blog.slug = req.body.slug || blog.slug;
    blog.excerpt = req.body.excerpt || blog.excerpt;
    blog.content = req.body.content || blog.content;
    blog.coverImage = req.body.coverImage || blog.coverImage;
    blog.category = req.body.category || blog.category;
    blog.readTime = req.body.readTime || blog.readTime;
    blog.tags = req.body.tags || blog.tags;
    blog.featured = req.body.featured !== undefined ? req.body.featured : blog.featured;
    blog.published = req.body.published !== undefined ? req.body.published : (req.body.active !== undefined ? req.body.active : blog.published);
    blog.active = req.body.active !== undefined ? req.body.active : (req.body.published !== undefined ? req.body.published : blog.active);

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/blogs/:id
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    let blog = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      blog = await BlogModel.findById(id);
    }
    if (!blog) {
      blog = await BlogModel.findOne({ $or: [{ id }, { slug: id }] });
    }
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    await BlogModel.deleteOne({ _id: blog._id });
    res.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

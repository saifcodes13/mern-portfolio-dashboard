import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=600&fit=crop",
    },
    category: {
      type: String,
      default: "Web Development",
      trim: true,
    },
    readTime: {
      type: String,
      default: "5 min read",
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: String,
      default: "Saif Tandel",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const BlogModel = mongoose.model("Blog", blogSchema);
export default BlogModel;

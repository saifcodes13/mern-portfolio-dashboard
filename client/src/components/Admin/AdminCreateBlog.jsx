import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Undo2, Save, Sparkles, BookOpen } from "lucide-react";
import { createBlog } from "../../api/portfolioApi";

const AdminCreateBlog = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Full-Stack Architecture",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=600&fit=crop",
    excerpt: "",
    tags: "React.js, Node.js, WebDev",
    content: "",
    featured: false,
    published: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // Auto-generate slug when title changes if slug was empty or auto-derived
      if (name === "title" && (!prev.slug || prev.slug === generateSlug(prev.title))) {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      await createBlog(payload);
      alert("Blog post published successfully!");
      navigate("/admin/blogs");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create blog post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-4 sm:px-8 py-8 max-w-4xl mx-auto">
      {/* Back Link */}
      <Link
        to="/admin/blogs"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 mb-6 transition"
      >
        <Undo2 className="w-5 h-5" />
        <span>Back to Blogs</span>
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Write New <span className="text-purple-400">Blog Post</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Share tutorials, technical case studies, or architecture guides.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/15 border border-red-500/30 text-red-300 rounded-xl mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 glass-panel p-8 rounded-2xl border border-white/10">
        
        {/* Title */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
            Article Title <span className="text-purple-400">*</span>
          </label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Scaling MERN Stack Apps with Redis & Nginx"
            className="w-full bg-[#11111b] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-purple-500 outline-none text-sm transition"
          />
        </div>

        {/* Slug & Category Row */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              URL Slug
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="e.g. scaling-mern-stack-apps"
              className="w-full bg-[#11111b] text-gray-300 font-mono text-xs px-4 py-3 rounded-xl border border-white/10 focus:border-purple-500 outline-none transition"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-[#11111b] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-purple-500 outline-none text-sm transition"
            >
              <option value="Full-Stack Architecture">Full-Stack Architecture</option>
              <option value="DevOps & Cloud">DevOps & Cloud</option>
              <option value="Database Engineering">Database Engineering</option>
              <option value="Frontend Engineering">Frontend Engineering</option>
              <option value="Tutorials & Guides">Tutorials & Guides</option>
            </select>
          </div>
        </div>

        {/* Read Time & Cover Image */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Read Time
            </label>
            <input
              type="text"
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
              placeholder="e.g. 5 min read"
              className="w-full bg-[#11111b] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-purple-500 outline-none text-sm transition"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Cover Image URL
            </label>
            <input
              type="text"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-[#11111b] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-purple-500 outline-none text-sm transition"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
            Short Excerpt / Summary <span className="text-purple-400">*</span>
          </label>
          <textarea
            name="excerpt"
            required
            rows={2}
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Brief 1-2 sentence overview shown on blog cards..."
            className="w-full bg-[#11111b] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-purple-500 outline-none text-sm transition resize-none"
          />
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
            Tags (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="React, Node.js, Cloud, DevOps"
            className="w-full bg-[#11111b] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-purple-500 outline-none text-sm transition"
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center justify-between">
            <span>Article Content (Markdown Supported) *</span>
            <span className="text-purple-400 font-normal text-[11px]">Supports ### Headings, ```code blocks, - lists</span>
          </label>
          <textarea
            name="content"
            required
            rows={12}
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your article content here in Markdown...&#10;&#10;### Introduction&#10;In this article we will explore...&#10;&#10;```javascript&#10;const app = express();&#10;```"
            className="w-full bg-[#11111b] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-purple-500 outline-none font-mono text-xs sm:text-sm leading-relaxed transition"
          />
        </div>

        {/* Active & Featured checkboxes */}
        <div className="flex flex-wrap items-center gap-6 pt-2">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={formData.active !== false}
              onChange={handleChange}
              className="w-4 h-4 text-purple-600 rounded bg-[#11111b] border-white/10 cursor-pointer"
            />
            <label htmlFor="active" className="text-sm text-gray-300 cursor-pointer">
              Active / Published (Visible on site)
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 text-purple-600 rounded bg-[#11111b] border-white/10 cursor-pointer"
            />
            <label htmlFor="featured" className="text-sm text-gray-300 cursor-pointer">
              Mark as Featured Article (pinned to top)
            </label>
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/blogs")}
            className="px-6 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:text-white transition text-sm cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-8 py-2.5 rounded-xl font-semibold transition shadow-lg shadow-purple-600/30 disabled:opacity-50 cursor-pointer text-sm"
          >
            <Save className="w-4 h-4" />
            <span>{submitting ? "Publishing..." : "Publish Blog Post"}</span>
          </button>
        </div>

      </form>
    </div>
  );
};

export default AdminCreateBlog;

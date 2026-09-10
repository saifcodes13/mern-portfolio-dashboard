import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Undo2, Save, Trash2 } from "lucide-react";
import { fetchBlogById, updateBlog, deleteBlog } from "../../api/portfolioApi";

const AdminEditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Full-Stack Architecture",
    readTime: "5 min read",
    coverImage: "",
    excerpt: "",
    tags: "",
    content: "",
    featured: false,
    published: true,
  });

  useEffect(() => {
    const loadBlog = async () => {
      try {
        setLoading(true);
        const data = await fetchBlogById(id);
        if (data) {
          setFormData({
            title: data.title || "",
            slug: data.slug || "",
            category: data.category || "Full-Stack Architecture",
            readTime: data.readTime || "5 min read",
            coverImage: data.coverImage || "",
            excerpt: data.excerpt || "",
            tags: Array.isArray(data.tags) ? data.tags.join(", ") : data.tags || "",
            content: data.content || "",
            featured: data.featured || false,
            published: data.published !== undefined ? data.published : true,
          });
        }
      } catch (err) {
        setError("Failed to load blog post for editing");
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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

      await updateBlog(id, payload);
      alert("Blog post updated successfully!");
      navigate("/admin/blogs");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update blog post");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await deleteBlog(id);
        alert("Blog deleted successfully!");
        navigate("/admin/blogs");
      } catch (err) {
        alert("Failed to delete blog: " + err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-400">Loading blog post details...</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-4 sm:px-8 py-8 max-w-4xl mx-auto">
      {/* Back Link */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/admin/blogs"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition"
        >
          <Undo2 className="w-5 h-5" />
          <span>Back to Blogs</span>
        </Link>

        <button
          type="button"
          onClick={handleDelete}
          className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20 transition cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete Blog</span>
        </button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Edit <span className="text-purple-400">Blog Post</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Update article content, metadata, tags, or publication status.
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
            className="w-full bg-[#11111b] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-purple-500 outline-none text-sm transition"
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
            Article Content (Markdown Supported) *
          </label>
          <textarea
            name="content"
            required
            rows={14}
            value={formData.content}
            onChange={handleChange}
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
              checked={formData.active !== false && formData.published !== false}
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

        {/* Action buttons */}
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
            <span>{submitting ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>

      </form>
    </div>
  );
};

export default AdminEditBlog;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, Undo2, BookOpen, Eye, Clock, Tag, Power, PowerOff, CheckCircle2, XCircle, Save, Loader2 } from "lucide-react";
import { fetchBlogs, deleteBlog, updateBlog } from "../../api/portfolioApi";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [originalBlogs, setOriginalBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchBlogs();
      setBlogs(data || []);
      setOriginalBlogs(JSON.parse(JSON.stringify(data || [])));
      setHasChanges(false);
    } catch (err) {
      setError("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleStatus = (blog) => {
    const targetId = blog._id || blog.id || blog.slug;
    if (!targetId) return;
    const currentActive = blog.active !== false && blog.published !== false;
    const nextActive = !currentActive;

    setBlogs((prev) => {
      const nextList = prev.map((b) => {
        const itemKey = b._id || b.id || b.slug;
        return String(itemKey) === String(targetId)
          ? { ...b, active: nextActive, published: nextActive }
          : b;
      });

      const modified = nextList.some((b) => {
        const orig = originalBlogs.find(
          (o) => String(o._id || o.id || o.slug) === String(b._id || b.id || b.slug)
        );
        if (!orig) return false;
        const origActive = orig.active !== false && orig.published !== false;
        const curActive = b.active !== false && b.published !== false;
        return origActive !== curActive;
      });

      setHasChanges(modified);
      return nextList;
    });
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const changedBlogs = blogs.filter((b) => {
        const orig = originalBlogs.find(
          (o) => String(o._id || o.id || o.slug) === String(b._id || b.id || b.slug)
        );
        if (!orig) return false;
        const origActive = orig.active !== false && orig.published !== false;
        const curActive = b.active !== false && b.published !== false;
        return origActive !== curActive;
      });

      await Promise.all(
        changedBlogs.map((b) =>
          updateBlog(b._id || b.id || b.slug, {
            active: b.active !== false && b.published !== false,
            published: b.active !== false && b.published !== false,
          })
        )
      );

      setOriginalBlogs(JSON.parse(JSON.stringify(blogs)));
      setHasChanges(false);
      setSuccessMsg(`Saved ${changedBlogs.length} blog status change(s) successfully!`);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err) {
      setError("Failed to save changes: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await deleteBlog(id);
        setBlogs((prev) => prev.filter((b) => String(b._id || b.id || b.slug) !== String(id)));
        setOriginalBlogs((prev) => prev.filter((b) => String(b._id || b.id || b.slug) !== String(id)));
        alert("Blog post deleted successfully!");
      } catch (err) {
        alert("Failed to delete blog post: " + err.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-4 sm:px-8 py-8">
      {/* Back button */}
      <Link
        to="/admin"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 mb-6 transition"
      >
        <Undo2 className="w-5 h-5" />
        <span>Back to Dashboard</span>
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Manage <span className="text-purple-400">Blogs & Articles</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Create, edit, or publish engineering articles and tutorials
          </p>
        </div>

        <div className="flex items-center gap-3">
          {hasChanges && (
            <button
              onClick={handleSaveChanges}
              disabled={saving}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-5 py-2.5 rounded-xl font-semibold transition cursor-pointer shadow-lg shadow-emerald-600/30 animate-pulse"
            >
              {saving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              <span>{saving ? "Saving..." : "Save Changes"}</span>
            </button>
          )}

          <button
            onClick={() => navigate("/admin/blogs/create")}
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-semibold transition cursor-pointer shadow-lg shadow-purple-600/30"
          >
            <Plus className="w-5 h-5" />
            <span>Write New Blog</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center text-gray-400">Loading blog posts...</div>
      ) : blogs.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
          <BookOpen className="w-12 h-12 text-gray-500 mx-auto mb-3" />
          <p className="text-gray-300 text-lg mb-2">No blogs created yet</p>
          <p className="text-gray-500 text-sm mb-6">
            Share your knowledge by writing your first article.
          </p>
          <button
            onClick={() => navigate("/admin/blogs/create")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold"
          >
            Create First Blog
          </button>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#11111b] text-gray-400 uppercase text-[11px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="px-6 py-4">Title & Excerpt</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Read Time</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                {blogs.map((blog) => {
                  const isActive = blog.active !== false && blog.published !== false;
                  return (
                    <tr
                      key={blog.id || blog._id}
                      className="hover:bg-white/5 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="font-bold text-white max-w-md line-clamp-1">
                          {blog.title}
                        </div>
                        <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                          {blog.excerpt}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs">
                          {blog.category || "General"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-mono text-gray-400">
                        {blog.readTime || "5 min read"}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleStatus(blog)}
                          title={isActive ? "Click to Deactivate blog" : "Click to Activate blog"}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition cursor-pointer ${
                            isActive
                              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25"
                              : "bg-red-500/15 text-red-400 border-red-500/30 hover:bg-red-500/25"
                          }`}
                        >
                          {isActive ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Inactive</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-400">
                        {blog.date || "2026"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/blogs/${blog.slug || blog.id || blog._id}`}
                            target="_blank"
                            title="View Live Article"
                            className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-purple-300 transition"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() =>
                              navigate(`/admin/blogs/${blog.id || blog._id}/edit`)
                            }
                            title="Edit Blog"
                            className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-indigo-300 transition cursor-pointer"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(blog.id || blog._id)}
                            title="Delete Blog"
                            className="p-2 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400 transition cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;

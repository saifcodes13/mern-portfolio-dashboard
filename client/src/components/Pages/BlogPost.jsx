import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Share2,
  Copy,
  Check,
  User,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { fetchBlogById, fetchBlogs } from "../../api/portfolioApi";
import Loader from "../Loader.jsx";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadPost = async () => {
      try {
        setLoading(true);
        const data = await fetchBlogById(id);
        setBlog(data);

        // Also fetch recent blogs for recommendations
        const all = await fetchBlogs();
        setRecentBlogs(all.filter((b) => b.id !== id && b.slug !== id).slice(0, 2));
      } catch (err) {
        console.error("Failed to load blog post:", err);
        setError("Article not found.");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="pt-28 pb-24 min-h-screen bg-[#08080c]">
        <Loader message="Loading article content..." minHeight="min-h-[500px]" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="pt-36 pb-24 min-h-screen bg-[#08080c] flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Article Not Found</h2>
        <p className="text-gray-400 mb-6">
          The requested article could not be located.
        </p>
        <Link
          to="/blogs"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all"
        >
          Back to All Articles
        </Link>
      </div>
    );
  }

  // Format simple markdown paragraphs, headings, and code blocks
  const renderFormattedContent = (content) => {
    if (!content) return null;

    const sections = content.split("\n\n");

    return sections.map((sec, idx) => {
      const trimmed = sec.trim();

      if (trimmed.startsWith("### ")) {
        return (
          <h3
            key={idx}
            className="text-2xl font-bold text-white mt-8 mb-4 border-l-4 border-purple-500 pl-3 leading-snug"
          >
            {trimmed.replace("### ", "")}
          </h3>
        );
      }

      if (trimmed.startsWith("## ")) {
        return (
          <h2
            key={idx}
            className="text-3xl font-extrabold text-white mt-10 mb-5 leading-snug"
          >
            {trimmed.replace("## ", "")}
          </h2>
        );
      }

      if (trimmed.startsWith("```")) {
        const lines = trimmed.split("\n");
        const code = lines.slice(1, -1).join("\n");
        return (
          <div
            key={idx}
            className="my-6 rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d16] p-4 sm:p-6"
          >
            <pre className="font-mono text-xs sm:text-sm text-purple-200 overflow-x-auto leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const items = trimmed.split("\n");
        return (
          <ul key={idx} className="my-4 space-y-2 list-disc list-inside text-gray-300 text-base sm:text-lg leading-relaxed">
            {items.map((it, iIdx) => (
              <li key={iIdx}>{it.replace(/^[-*]\s+/, "")}</li>
            ))}
          </ul>
        );
      }

      if (trimmed === "---") {
        return <hr key={idx} className="my-8 border-white/10" />;
      }

      return (
        <p key={idx} className="text-gray-300 text-base sm:text-lg leading-relaxed my-4">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <article className="pt-28 pb-24 bg-[#08080c] min-h-screen relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all articles</span>
          </Link>
        </div>

        {/* Article Header Metadata */}
        <header className="space-y-6 mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
              {blog.category || "Engineering"}
            </span>
            <span className="text-gray-500">•</span>
            <span className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              {blog.readTime || "5 min read"}
            </span>
            <span className="text-gray-500">•</span>
            <span className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              {blog.date || "2026"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
            {blog.title}
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed font-light">
            {blog.excerpt}
          </p>

          {/* Author & Share Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
                ST
              </div>
              <div>
                <div className="text-sm font-bold text-white">
                  {blog.author || "Saif Tandel"}
                </div>
                <div className="text-xs text-gray-400">
                  Full-Stack & DevOps Engineer
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="glass-panel px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white flex items-center gap-2 border border-white/10 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Share Article</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {blog.coverImage && (
          <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-invert max-w-none mb-16 border-b border-white/10 pb-12">
          {renderFormattedContent(blog.content)}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mb-14">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-purple-400" />
              Related Topics
            </h4>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-white/5 text-gray-300 text-xs font-mono border border-white/10"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio Card */}
        <div className="glass-panel p-8 rounded-3xl border border-purple-500/20 mb-16 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-black text-2xl text-white flex-shrink-0 shadow-lg shadow-purple-600/30">
            ST
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Written by Saif Tandel</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              React.js and MERN stack developer focused on building scalable web applications, custom CRM modules, and high-performance cloud architectures.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-1"
              >
                <span>Hire / Collaborate with Saif</span>
                <ArrowLeft className="w-3 h-3 rotate-180" />
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {recentBlogs.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">
              More Engineering Insights
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {recentBlogs.map((rBlog) => (
                <Link
                  key={rBlog.id || rBlog._id}
                  to={`/blogs/${rBlog.slug || rBlog.id || rBlog._id}`}
                  className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 block group"
                >
                  <span className="text-xs text-purple-400 font-mono block mb-2">
                    {rBlog.category}
                  </span>
                  <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2 mb-2">
                    {rBlog.title}
                  </h4>
                  <span className="text-xs text-gray-400">
                    {rBlog.readTime}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
};

export default BlogPost;

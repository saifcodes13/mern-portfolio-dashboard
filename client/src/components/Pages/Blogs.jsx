import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  Clock,
  Search,
  ArrowRight,
  Sparkles,
  Tag,
  Share2,
} from "lucide-react";
import Loader from "../Loader.jsx";
import { usePortfolio } from "../../context/PortfolioContext.jsx";

const Blogs = () => {
  const { blogs: contextBlogs, loading: contextLoading } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const blogs = contextBlogs || [];
  const loading = contextLoading && blogs.length === 0;

  const categories = [
    "All",
    "DevOps & Cloud",
    "Full-Stack Architecture",
    "Database Engineering",
  ];

  const publicBlogs = blogs.filter(
    (b) => b.published !== false && b.active !== false
  );

  const filteredBlogs = publicBlogs.filter((blog) => {
    const matchesCategory =
      activeCategory === "All" || blog.category === activeCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.tags &&
        blog.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    return matchesCategory && matchesSearch;
  });

  const featuredBlog = publicBlogs.find((b) => b.featured) || publicBlogs[0];

  return (
    <div className="pt-28 pb-24 bg-[#08080c] min-h-screen relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-10 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Developer Insights & Case Studies</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight">
            Engineering <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">Blogs</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-4 mb-6 rounded-full" />
          <p className="text-gray-400 text-base lg:text-lg max-w-2xl mx-auto">
            Practical articles on full-stack web engineering, cloud deployment architectures, CRM development, and database performance tuning.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-4xl mx-auto mb-14 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles by title, topic, or keyword (e.g. CloudNest, CRM, MySQL, Nginx)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#11111b] text-white pl-12 pr-4 py-3.5 rounded-2xl border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30 scale-105"
                    : "glass-panel text-gray-300 hover:text-white hover:border-purple-500/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <Loader message="Fetching engineering blogs & case studies..." minHeight="min-h-[350px]" />
        ) : (
          <>
            {/* Featured Post Hero Card (shown when no search query is active) */}
        {!searchQuery && activeCategory === "All" && featuredBlog && (
          <div className="mb-16">
            <div className="glass-panel glass-panel-hover rounded-3xl overflow-hidden border border-purple-500/30 grid md:grid-cols-12 gap-6 group">
              <div className="md:col-span-6 relative aspect-video md:aspect-auto overflow-hidden bg-[#11111b]">
                <img
                  src={featuredBlog.coverImage}
                  alt={featuredBlog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Featured Article
                  </span>
                </div>
              </div>

              <div className="md:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-purple-400 font-mono">
                    <span className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20">
                      {featuredBlog.category}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredBlog.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                    {featuredBlog.title}
                  </h2>

                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                    {featuredBlog.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {featuredBlog.tags &&
                      featuredBlog.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2.5 py-0.5 rounded-md bg-white/5 text-gray-300 border border-white/10"
                        >
                          #{t}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-xs text-gray-400 flex items-center gap-2">
                    <span>By {featuredBlog.author || "Saif Tandel"}</span>
                    <span>•</span>
                    <span>{featuredBlog.date || "Recent"}</span>
                  </div>

                  <Link
                    to={`/blogs/${featuredBlog.slug || featuredBlog.id || featuredBlog._id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 group-hover:text-purple-300 transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Post Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.id || blog._id}
              className="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-video overflow-hidden bg-[#11111b]">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#08080c]/80 backdrop-blur-md text-purple-300 border border-purple-500/30">
                    {blog.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    <span>{blog.readTime}</span>
                    <span>•</span>
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    <span>{blog.date || "2026"}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {blog.tags &&
                      blog.tags.slice(0, 3).map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5"
                        >
                          #{t}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {blog.author || "Saif Tandel"}
                </span>

                <Link
                  to={`/blogs/${blog.slug || blog.id || blog._id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-20 glass-panel rounded-2xl border border-white/10 max-w-lg mx-auto">
            <p className="text-gray-300 text-lg mb-2">No articles found</p>
            <p className="text-gray-500 text-sm">
              Try searching with another keyword or select "All" categories.
            </p>
          </div>
        )}
          </>
        )}

      </div>
    </div>
  );
};

export default Blogs;

import React, { useState } from "react";
import { createProject } from "../../api/portfolioApi";
import { Link, useNavigate } from "react-router-dom";
import { Undo2 } from "lucide-react";

const AdminCreateProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [image, setImage] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [featured, setFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createProject({
        title,
        description,
        techStack: techStack.split(",").map((t) => t.trim()),
        image,
        liveLink,
        githubLink,
        featured,
      });

      navigate("/admin/projects");
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to create Project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Link to= {"/admin/projects"}><Undo2/></Link>
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl bg-[#111111] border border-purple-500/20 rounded-xl p-8 shadow-lg">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Create <span className="text-purple-400">Project</span>
        </h1>

        {error && (
          <p className="bg-red-500/10 text-red-400 text-sm p-3 rounded-md mb-4">
            {error}
          </p>
        )}

        <form onSubmit={submitHandler} className="space-y-5">

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full bg-[#0a0a0a] border border-purple-500/20 rounded-md px-4 py-3 focus:border-purple-500 outline-none"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="w-full bg-[#0a0a0a] border border-purple-500/20 rounded-md px-4 py-3 focus:border-purple-500 outline-none resize-none"
          />

          <input
            type="text"
            placeholder="Tech Stack (comma separated)"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            required
            className="w-full bg-[#0a0a0a] border border-purple-500/20 rounded-md px-4 py-3 focus:border-purple-500 outline-none"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}  
            onChange={(e) => setImage(e.target.value)}
            required
            className="w-full bg-[#0a0a0a] border border-purple-500/20 rounded-md px-4 py-3 focus:border-purple-500 outline-none"
          />

          <input
            type="text"
            placeholder="Live Link"
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
            required
            className="w-full bg-[#0a0a0a] border border-purple-500/20 rounded-md px-4 py-3 focus:border-purple-500 outline-none"
          />

          <input
            type="text"
            placeholder="Github Link"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            required
            className="w-full bg-[#0a0a0a] border border-purple-500/20 rounded-md px-4 py-3 focus:border-purple-500 outline-none"
          />

          <label className="flex items-center gap-3 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={featured} 
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 accent-purple-600"
            />
            Featured Project
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-md font-medium transition disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Project"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default AdminCreateProject;

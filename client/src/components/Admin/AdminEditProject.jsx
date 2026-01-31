import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { fetchProjectById, updateProject } from "../../api/portfolioApi";

const AdminEditProject = () => {
  const { id } = useParams(); // project id from URL
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [liveLink, setLiveLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [techStack, setTechStack] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load project by ID
  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await fetchProjectById(id);
        setTitle(data.title);
        setDescription(data.description);
        setFeatured(data.featured);
        setLiveLink(data.liveLink);
        setGithubLink(data.githubLink);
        setTechStack(data.techStack);
        setLoading(false);
      } catch (err) {
        setError("Failed to load project");
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  // Submit update
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateProject(id, {
        title,
        description,
        featured,
        liveLink,
      });

      navigate("/admin/projects");
    } catch (err) {
      setError("Failed to update project");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-8 py-10">
      <h1 className="text-3xl font-bold mb-6">
        Edit <span className="text-purple-400">Project</span>
      </h1>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <form onSubmit={submitHandler} className="max-w-lg space-y-5">
        {/* Title */}
        <div>
          <label className="block text-gray-400 mb-1">Project Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#111111] border border-purple-500/20 px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Description</label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-40 bg-[#111111] border border-purple-500/20 px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-1">Tech Stack</label>
          <input
            type="text"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            className="w-full  bg-[#111111] border border-purple-500/20 px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-1">Live Link</label>
          <input
            type="text"
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
            className="w-full  bg-[#111111] border border-purple-500/20 px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-1">Github Link</label>
          <input
            type="text"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            className="w-full  bg-[#111111] border border-purple-500/20 px-4 py-2 rounded-md focus:outline-none focus:border-purple-500"
            required
          />
        </div>

        {/* Featured */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="accent-purple-600"
          />
          <label className="text-gray-300">Featured Project</label>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-md"
          >
            Update
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditProject;

import { useEffect } from "react";
import { useState } from "react";
import { Plus, Pencil, Trash2, Undo2, CheckCircle2, XCircle } from "lucide-react";

import { fetchProjects, deleteProject, updateProject } from "../../api/portfolioApi";
import { Link, useNavigate } from "react-router-dom";


const AdminProjects = () => {
  const [projects, setProjects] = useState(() => {
    const cached = localStorage.getItem("projects");
    return cached ? JSON.parse(cached) : null;
  });
  const [error, setError] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
        localStorage.setItem("projects", JSON.stringify(data));
      } catch (error) {
        setError("Failed to load projects");
      }
    };
    loadData();
  }, []);

  const toggleActive = async (project) => {
    const nextActive = !(project.active !== false);
    try {
      await updateProject(project._id || project.id, { active: nextActive });
      setProjects((prev) =>
        prev.map((p) =>
          (p._id === project._id || p.id === project.id)
            ? { ...p, active: nextActive }
            : p
        )
      );
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProject(id);
        setProjects((prev) => prev.filter((p) => p._id !== id && p.id !== id));
        alert("Project deleted successfully");
      } catch (error) {
        alert(error.message || "Delete failed");
      }
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Link to={"/admin"}>
        <Undo2 />
      </Link>
      <div className=" min-h-screen  bg-[#0a0a0a] text-white px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Manage <span className="text-purple-400">Projects</span>
          </h1>
          <button
            onClick={() => navigate(`/admin/projects/create`)}
            className=" flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md cursor-pointer"
          >
            <Plus />
            Add Project
          </button>
        </div>

        {/* Project table*/}
        <div className="bg-[#111111] border border-purple-500/20 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#181824] border-b border-purple-500/10">
              <tr className="text-gray-400 text-sm">
                <th className="p-4">Title</th>
                <th className="p-4">Status</th>
                <th className="p-4">Featured</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {projects && projects.map((project) => {
                const isActive = project.active !== false;
                return (
                  <tr
                    key={project._id || project.id}
                    className="border-t border-purple-500/10 hover:bg-[#141420]"
                  >
                    <td className="p-4 font-medium">{project.title}</td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleActive(project)}
                        title={isActive ? "Click to Deactivate project" : "Click to Activate project"}
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
                    <td className="p-4">
                      {project.featured ? (
                        <span className="text-green-400 text-xs font-semibold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">Yes</span>
                      ) : (
                        <span className="text-gray-400 text-xs">No</span>
                      )}
                    </td>

                    <td className=" p-4 flex gap-3">
                      <button
                        className="text-blue-400 hover:text-blue-500 cursor-pointer"
                        onClick={() =>
                          navigate(`/admin/projects/${project._id || project.id}/edit`)
                        }
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(project._id || project.id)}
                        className="text-red-400 hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {(!projects || projects.length === 0) && (
            <p className="text-center text-gray-400 py-6">No project found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminProjects;

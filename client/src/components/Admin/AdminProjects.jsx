import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Undo2, CheckCircle2, XCircle, Save, Loader2 } from "lucide-react";
import { fetchProjects, deleteProject, updateProject } from "../../api/portfolioApi";
import { Link, useNavigate } from "react-router-dom";
import { usePortfolio } from "../../context/PortfolioContext.jsx";

const AdminProjects = () => {
  const { refetchProjects } = usePortfolio();
  const [projects, setProjects] = useState(() => {
    const cached = localStorage.getItem("projects");
    return cached ? JSON.parse(cached) : null;
  });
  const [originalProjects, setOriginalProjects] = useState([]);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [error, setError] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data || []);
        setOriginalProjects(JSON.parse(JSON.stringify(data || [])));
        localStorage.setItem("projects", JSON.stringify(data));
        setHasChanges(false);
      } catch (error) {
        setError("Failed to load projects");
      }
    };
    loadData();
  }, []);

  const toggleActive = (project) => {
    const targetId = project._id || project.id;
    if (!targetId) return;
    const nextActive = !(project.active !== false);

    setProjects((prev) => {
      const nextList = prev.map((p) => {
        const itemKey = p._id || p.id;
        return String(itemKey) === String(targetId)
          ? { ...p, active: nextActive }
          : p;
      });

      const modified = nextList.some((p) => {
        const orig = originalProjects.find(
          (o) => String(o._id || o.id) === String(p._id || p.id)
        );
        if (!orig) return false;
        return (orig.active !== false) !== (p.active !== false);
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
      const changedProjects = projects.filter((p) => {
        const orig = originalProjects.find(
          (o) => String(o._id || o.id) === String(p._id || p.id)
        );
        if (!orig) return false;
        return (orig.active !== false) !== (p.active !== false);
      });

      await Promise.all(
        changedProjects.map((p) =>
          updateProject(p._id || p.id, { active: p.active !== false })
        )
      );

      setOriginalProjects(JSON.parse(JSON.stringify(projects)));
      localStorage.setItem("projects", JSON.stringify(projects));
      setHasChanges(false);
      refetchProjects();
      setSuccessMsg(`Saved ${changedProjects.length} project status change(s) successfully!`);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err) {
      setError("Failed to save changes: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProject(id);
        setProjects((prev) => prev.filter((p) => String(p._id || p.id) !== String(id)));
        setOriginalProjects((prev) => prev.filter((p) => String(p._id || p.id) !== String(id)));
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
      <div className="min-h-screen bg-[#0a0a0a] text-white px-8 py-10">
        <Link to={"/admin"} className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 mb-6 transition">
          <Undo2 className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Manage <span className="text-purple-400">Projects</span>
          </h1>

          <div className="flex items-center gap-3">
            {hasChanges && (
              <button
                onClick={handleSaveChanges}
                disabled={saving}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-5 py-2 rounded-md font-semibold transition cursor-pointer shadow-lg shadow-emerald-600/30 animate-pulse"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>{saving ? "Saving..." : "Save Changes"}</span>
              </button>
            )}

            <button
              onClick={() => navigate(`/admin/projects/create`)}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md cursor-pointer"
            >
              <Plus />
              Add Project
            </button>
          </div>
        </div>

        {successMsg && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

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

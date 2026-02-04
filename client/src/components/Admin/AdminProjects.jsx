import { useEffect } from "react";
import { useState } from "react";
import { Plus, Pencil, Trash2, Undo2 } from "lucide-react";

import { fetchProjects, deleteProject } from "../../api/portfolioApi";
import { Link, useNavigate } from "react-router-dom";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        setError("Failed to load projects");
      }
    };
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteProject(id);
        console.alert("Product deleted succesfully");
      } catch (error) {
        console.alert(error);
      }
    }
  };
  // console.log(projects);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
    <Link to = {"/admin"}><Undo2/></Link>
    <div className=" min-h-screen  bg-[#0a0a0a] text-white px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Manage <span className="text-purple-400">Projects</span>
        </h1>
        <button
          onClick={() => navigate(`/admin/projects/create`)}
          className=" flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md"
        >
          <Plus />
          Add Project
        </button>
      </div>

      {/* Project table*/}
      <div className="bg-#111111 border border-purple-500/20 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#0f0f0]">
            <tr className="text-gray-400 text-sm">
              <th className="p-4">Title</th>
              <th className="p-4">Featured</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr
                key={project._id}
                className="border-t border-purple-500/10 hover:bg-[#0f0f0f]"
              >
                <td className="p-4 font-medium">{project.title}</td>
                <td>
                  {project.featured ? (
                    <span className="text-green-400">Yes</span>
                  ) : (
                    <span className="text-red-400">No</span>
                  )}
                </td>

                <td className=" p-4 flex gap-3">
                  <button
                    className="text-blue-400 hover:text-blue-500"
                    onClick={() =>
                      navigate(`/admin/projects/${project._id}/edit`)
                    }
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="text-red-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {projects.length === 0 && (
          <p className="text-center text-gray-400 py-6">No project found</p>
        )}
      </div>
    </div>
    </>
  );
};

export default AdminProjects;

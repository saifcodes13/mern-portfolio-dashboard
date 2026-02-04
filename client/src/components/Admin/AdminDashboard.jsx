import React from "react";
import { FolderKanban, Wrench, LogOut } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true },
      );
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-8 py-10">
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Admin <span className="text-purple-400">Dashboard</span>
        </h1>
        <p className="text-gray-400 mt-2">
          Manage your portfolio content from here
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Projects */}
        <div className="bg-[#111111] border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition">
          <div className="flex items-center gap-4 mb-4">
            <FolderKanban className="text-purple-400" size={28} />
            <h3 className="text-xl font-semibold">Projects</h3>
          </div>
          <p className="text-gray-400 text-sm mb-6">
            Add, edit or remove portfolio projects
          </p>
          <button
            className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-md transition"
            onClick={() => navigate("/admin/projects")}
          >
            Manage Projects
          </button>
        </div>

        {/* Skills */}
        <div className="bg-[#111111] border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition">
          <div className="flex items-center gap-4 mb-4">
            <Wrench className="text-purple-400" size={28} />
            <h3 className="text-xl font-semibold">Skills</h3>
          </div>
          <p className="text-gray-400 text-sm mb-6">
            Update your skills and expertise levels
          </p>
          <button
            className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-md transition"
            onClick={() => navigate("/admin/skills")}
          >
            Manage Skills
          </button>
        </div>

        {/* Logout */}
        <div className="bg-[#111111] border border-red-500/20 rounded-xl p-6 hover:border-red-500/40 transition">
          <div className="flex items-center gap-4 mb-4">
            <LogOut className="text-red-400" size={28} />
            <h3 className="text-xl font-semibold">Logout</h3>
          </div>
          <p className="text-gray-400 text-sm mb-6">
            End admin session securely
          </p>
          <button
            className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-md transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

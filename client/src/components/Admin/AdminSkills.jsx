import React, { useEffect, useState } from "react";
import {
  Pencil,
  Undo2,
  CheckCircle2,
  XCircle,
  Code,
  Server,
  Wrench,
  Sparkles,
} from "lucide-react";
import { fetchSkills, updateSkill } from "../../api/portfolioApi";
import { useNavigate, Link } from "react-router-dom";

const AdminSkills = () => {
  const [skills, setSkills] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savingId, setSavingId] = useState(null);

  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchSkills();
      setSkills(data);
    } catch {
      setError("Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleSkillStatus = async (category, index) => {
    try {
      setSavingId(`${category}-${index}`);
      const updated = {
        ...skills,
        frontend: [...(skills.frontend || [])],
        backend: [...(skills.backend || [])],
        tools: [...(skills.tools || [])],
      };

      if (category === "tools") {
        const item = updated.tools[index];
        const isCurrentlyActive =
          typeof item === "string" ? true : item.active !== false;
        const toolName = typeof item === "string" ? item : item.name;
        updated.tools[index] = {
          name: toolName,
          active: !isCurrentlyActive,
        };
      } else {
        const item = updated[category][index];
        const isCurrentlyActive = item.active !== false;
        updated[category][index] = {
          ...item,
          active: !isCurrentlyActive,
        };
      }

      setSkills(updated);
      await updateSkill(updated);
    } catch (err) {
      alert("Failed to update skill status: " + err.message);
    } finally {
      setSavingId(null);
    }
  };

  if (error) return <div className="p-8 text-red-400">{error}</div>;
  if (loading || !skills) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white p-8 flex items-center justify-center">
        <div className="text-gray-400">Loading skills...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-4 sm:px-8 py-8">
      {/* Top back navigation */}
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
            Manage <span className="text-purple-400">Skills & Tooling</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Toggle visibility (Active / Inactive) or edit percentages
          </p>
        </div>

        <button
          onClick={() => navigate(`/admin/skills/edit`)}
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-semibold transition cursor-pointer shadow-lg shadow-purple-600/30 text-sm"
        >
          <Pencil className="w-4 h-4" />
          <span>Edit Skills & Levels</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Frontend Skills Card */}
        <div className="bg-[#11111b] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-purple-400 font-bold">
                <Code className="w-5 h-5" />
                <h3>Frontend Skills</h3>
              </div>
              <span className="text-xs text-gray-400 font-mono">
                {skills.frontend?.length || 0} items
              </span>
            </div>

            <div className="space-y-3">
              {skills.frontend &&
                skills.frontend.map((s, idx) => {
                  const isActive = s.active !== false;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition"
                    >
                      <div>
                        <div className="font-semibold text-sm text-white">
                          {s.name}
                        </div>
                        <div className="text-xs text-purple-400 font-mono">
                          {s.level}% proficiency
                        </div>
                      </div>

                      <button
                        onClick={() => toggleSkillStatus("frontend", idx)}
                        disabled={savingId === `frontend-${idx}`}
                        title={isActive ? "Click to Deactivate" : "Click to Activate"}
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
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Backend Skills Card */}
        <div className="bg-[#11111b] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-indigo-400 font-bold">
                <Server className="w-5 h-5" />
                <h3>Backend & Database</h3>
              </div>
              <span className="text-xs text-gray-400 font-mono">
                {skills.backend?.length || 0} items
              </span>
            </div>

            <div className="space-y-3">
              {skills.backend &&
                skills.backend.map((s, idx) => {
                  const isActive = s.active !== false;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/20 transition"
                    >
                      <div>
                        <div className="font-semibold text-sm text-white">
                          {s.name}
                        </div>
                        <div className="text-xs text-indigo-400 font-mono">
                          {s.level}% proficiency
                        </div>
                      </div>

                      <button
                        onClick={() => toggleSkillStatus("backend", idx)}
                        disabled={savingId === `backend-${idx}`}
                        title={isActive ? "Click to Deactivate" : "Click to Activate"}
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
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Tools & DevOps Card */}
        <div className="bg-[#11111b] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-violet-400 font-bold">
                <Wrench className="w-5 h-5" />
                <h3>Tools & Cloud</h3>
              </div>
              <span className="text-xs text-gray-400 font-mono">
                {skills.tools?.length || 0} items
              </span>
            </div>

            <div className="space-y-3">
              {skills.tools &&
                skills.tools.map((t, idx) => {
                  const toolName = typeof t === "string" ? t : t.name;
                  const isActive = typeof t === "string" ? true : t.active !== false;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-violet-500/20 transition"
                    >
                      <div className="font-semibold text-sm text-white">
                        {toolName}
                      </div>

                      <button
                        onClick={() => toggleSkillStatus("tools", idx)}
                        disabled={savingId === `tools-${idx}`}
                        title={isActive ? "Click to Deactivate" : "Click to Activate"}
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
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminSkills;

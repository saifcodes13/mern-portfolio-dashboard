import React, { useEffect, useState } from "react";
import { fetchSkills } from "../../api/portfolioApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Undo2 } from "lucide-react";

import { updateSkill } from "../../api/portfolioApi";

const AdminEditSkill = () => {
  // skills must be OBJECT, not array bcoz in data we have object
  const [skills, setSkills] = useState(null);
  const [frontendInput, setFrontendInput] = useState("");
  const [backendInput, setBackendInput] = useState("");
  const [toolsInput, setToolsInput] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load skills
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSkills();
        setSkills(data);
      } catch (error) {
        setError("Failed to load");
      }
    };
    loadData();
  }, []);

  // Convert array to string (CORRECT) bcoz input accepts string
  useEffect(() => {
    if (skills?.frontend) {
      setFrontendInput(
        skills.frontend.map((s) => `${s.name} - (${s.level})%`).join(", "),
      );
    }
  }, [skills]);

  useEffect(() => {
    if (skills?.backend) {
      setBackendInput(
        skills.backend.map((s) => `${s.name} - (${s.level})%`).join(", "),
      );
    }
  }, [skills]);

  // Convert tools array to string (FIXED)
  useEffect(() => {
    if (skills?.tools) {
      setToolsInput(skills.tools.join(", "));
    }
  }, [skills]);

  //  SAFE PARSER (prevents NaN & empty items)
  const parseSkillInput = (input) => {
    return input
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const match = item.match(/(.+)-\s*\(?(\d+)\)?%?/);
        if (!match) return null;

        return {
          name: match[1].trim(),
          level: Number(match[2]),
        };
      })
      .filter(Boolean);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const frontend = parseSkillInput(frontendInput);
      const backend = parseSkillInput(backendInput);

      const tools = toolsInput
        .split(",")
        .map((tool) => tool.trim())
        .filter(Boolean);

      // console.log(frontend);

      await updateSkill({
        frontend,
        backend,
        tools,
      });

      navigate("/admin/skills");
    } catch (error) {
      setError(error.message || "Update failed");
    }
  };

  console.log(skills);

  return (
    <>
    <Link to={"/admin/skills"}> <Undo2/>
    </Link>
    <div className=" mx-auto max-w-2xl min-h-screen bg-[#0a0a0a] text-white px-8 py-10">
      <h1 className="text-3xl font-bold mb-6">
        Edit <span className="text-purple-400">Skills</span>
      </h1>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <form onSubmit={submitHandler} className="max-w-3xl space-y-6">
        {/* Frontend */}
        <div>
          <label className="block text-gray-400 mb-2">Frontend Skills</label>
          <textarea
            rows={4}
            value={frontendInput}
            required
            className="w-full bg-[#111111] border border-purple-500/20 rounded-md px-4 py-3 focus:outline-none focus:border-purple-500 resize-none"
            onChange={(e) => setFrontendInput(e.target.value)}
          />
        </div>

        {/* Backend */}
        <div>
          <label className="block text-gray-400 mb-2">Backend Skills</label>
          <textarea
            rows={4}
            value={backendInput}
            className="w-full bg-[#111111] border border-purple-500/20 rounded-md px-4 py-3 focus:outline-none focus:border-purple-500 resize-none"
            onChange={(e) => setBackendInput(e.target.value)}
          />
        </div>

        {/* Tools */}
        <div>
          <label className="block text-gray-400 mb-2">Tools</label>
          <textarea
            rows={3}
            value={toolsInput}
            className="w-full bg-[#111111] border border-purple-500/20 rounded-md px-4 py-3 focus:outline-none focus:border-purple-500 resize-none"
            onChange={(e) => setToolsInput(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-md font-medium"
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
    </>
  );
};

export default AdminEditSkill;

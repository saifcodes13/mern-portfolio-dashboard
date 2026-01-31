import { useEffect, useState } from "react";
import {Plus, Pencil, Trash2, Undo2} from "lucide-react"

import { fetchSkills } from "../../api/portfolioApi";
import { useNavigate, Link } from "react-router-dom";

const AdminSkills = () => {
  const [skills, setSkills] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate()
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSkills();
        setSkills(data); // data is objectt
      } catch {
        setError("Failed to load skills");
      }
    };
    loadData();
  }, []);

  if (error) return <p className="text-red-400">{error}</p>;
  if (!skills) return <p>Loading...</p>;

  return (
    <>
    <Link to={"/admin"}><Undo2/></Link>
    <div className="min-h-screen mt-2">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Manage <span className="text-purple-400">Skills</span>
        </h1>
      </div>

      <div className="bg-[#111111] border border-purple-500/20 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black/40">
            <tr>
              <th className="p-4">Frontend</th>
              <th className="p-4">Backend</th>
              <th className="p-4">Tools</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
          <tr className="border-t border-purple-500/20 align-top">
            <td className="p-4">
              {skills.frontend.map((s) => (
                <div className="mb-2 " key={s.name}>{s.name} - {s.level}%</div>
              ))}
            </td>

            <td className="p-4">
              {skills.backend.map((s) => (
                <div className="mb-2 " key={s.name}>{s.name} - {s.level}%</div>
              ))}
            </td>

            <td className="p-4">
              {skills.tools.map((tools) => (
                <div className="mb-2 " key={tools}>{tools}</div>
              ))}
            </td>

            <td>
              <button onClick={() => navigate(`/admin/skills/edit`)} className="text-blue-400 hover:text-blue-500 px-2"><Pencil size={18}/></button>
              <button className="text-red-400 hover:text-red-500 px-2"><Trash2 size={18}/></button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};
export default AdminSkills

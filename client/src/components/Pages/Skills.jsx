import React, { useEffect, useState } from "react";
import {
  Code,
  Server,
  Database,
  Cloud,
  Wrench,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { fetchSkills } from "../../api/portfolioApi";
import { skillsData as defaultSkills } from "../../data/portfolioData";

import Loader from "../Loader.jsx";

const Skills = () => {
  const [skills, setSkills] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSkills();
        if (data) {
          setSkills(data);
          localStorage.setItem("skills", JSON.stringify(data));
        } else {
          setSkills(defaultSkills);
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error);
        setSkills(defaultSkills);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const s = skills || defaultSkills;

  return (
    <section id="skills" className="py-24 lg:py-32 bg-[#0c0c14] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Skills & <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">Expertise</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-4 mb-6 rounded-full" />
          <p className="text-gray-400 text-base lg:text-lg max-w-2xl mx-auto">
            Comprehensive full-stack toolset honed through enterprise CRM development, cloud microservices, and modern UI engineering.
          </p>
        </div>

        {/* Categories Grid */}
        {loading ? (
          <Loader message="Fetching skills & technical stack..." minHeight="min-h-[350px]" />
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Card 1: Frontend Development */}
          <div className="glass-panel glass-panel-hover p-8 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Code className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Frontend Development
                </h3>
              </div>

              <div className="space-y-4">
                {(s.frontend || defaultSkills.frontend)
                  .filter((skill) => skill.active !== false)
                  .map((skill, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-purple-400 font-mono text-xs">
                        {skill.level ? `${skill.level}%` : "Proficient"}
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-600 to-indigo-400 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level || 90}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-gray-400">
              Specialized in SPAs, Redux Toolkit, and Tailwind component design systems.
            </div>
          </div>

          {/* Card 2: Backend & Databases */}
          <div className="glass-panel glass-panel-hover p-8 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Server className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Backend & Databases
                </h3>
              </div>

              <div className="space-y-4">
                {(s.backend || defaultSkills.backend)
                  .filter((skill) => skill.active !== false)
                  .map((skill, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-indigo-400 font-mono text-xs">
                        {skill.level ? `${skill.level}%` : "Proficient"}
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level || 88}%` }}
                      />
                    </div>
                  </div>
                ))}

                {/* Databases Pills */}
                <div className="pt-3">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                    Databases:
                  </span>
                  <div className="flex gap-2">
                    <span className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono font-medium rounded-lg">
                      MongoDB (NoSQL)
                    </span>
                    <span className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono font-medium rounded-lg">
                      MySQL (Relational)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-gray-400">
              RESTful APIs, JWT Auth, Schema indexing, and complex query optimization.
            </div>
          </div>

          {/* Card 3: Cloud, DevOps & Hosting */}
          <div className="glass-panel glass-panel-hover p-8 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  <Cloud className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Cloud & DevOps
                </h3>
              </div>

              <p className="text-xs text-gray-300 mb-4 leading-relaxed">
                Self-hosting and continuous integration workflows deployed in production architectures:
              </p>

              <div className="grid grid-cols-2 gap-2">
                {[
                  "AWS S3",
                  "Cloudflare Tunnel",
                  "Nginx Proxy",
                  "GitHub Actions",
                  "Docker",
                  "PM2 Daemon",
                  "Ubuntu Linux",
                  "AWS EC2 / VPC",
                  "Vercel Deploy",
                  "Git Versioning",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-300 hover:text-purple-300 hover:border-purple-500/30 transition-all"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-gray-400">
              CI/CD automation, reverse proxying, secure tunnel ingress, and S3 media storage.
            </div>
          </div>

        </div>
        )}

        {/* Tools & Workflow Badge Bar */}
        <div className="mt-14 glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Developer Workflow & Productivity Tools
              </h3>
            </div>
            <span className="text-xs text-purple-400 font-mono">
              Production Verified
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {(s.tools && s.tools.length > 0
              ? s.tools
              : [
                  "Git & GitHub",
                  "Postman API Platform",
                  "Figma (UI/UX Translation)",
                  "VS Code",
                  "MongoDB Compass",
                  "MySQL Workbench",
                  "EmailJS Services",
                  "npm / Node Tooling",
                  "Vite Bundler",
                  "Ubuntu CLI",
                ]
            )
              .filter((tool) =>
                typeof tool === "string" ? true : tool.active !== false
              )
              .map((tool, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl bg-white/5 text-gray-300 hover:text-white hover:bg-purple-600/20 hover:border-purple-500/40 border border-white/10 text-xs font-medium transition-all duration-300 cursor-default"
                >
                  {typeof tool === "string" ? tool : tool.name}
                </span>
              ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;

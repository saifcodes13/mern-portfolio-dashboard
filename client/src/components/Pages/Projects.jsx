import React, { useEffect, useState } from "react";
import { ExternalLink, Github, Layers, Rocket, Sparkles, CheckCircle2 } from "lucide-react";
import { fetchProjects } from "../../api/portfolioApi";
import { projects as defaultProjects } from "../../data/portfolioData";

const Projects = () => {
  const [projectsList, setProjectsList] = useState(() => {
    const cached = localStorage.getItem("projects");
    return cached ? JSON.parse(cached) : defaultProjects;
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProjects();
        if (data && data.length > 0) {
          setProjectsList(data);
          localStorage.setItem("projects", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    loadData();
  }, []);

  const list = (projectsList && projectsList.length > 0 ? projectsList : defaultProjects)
    .filter((p) => p.active !== false);

  const filteredProjects = list.filter((p) => {
    if (filter === "all") return true;
    if (filter === "featured") return p.featured === true;
    if (filter === "devops") return p.category === "devops" || (p.techStack && p.techStack.includes("Nginx"));
    if (filter === "fullstack") return p.category === "fullstack" || (p.techStack && p.techStack.includes("Node.js"));
    return true;
  });

  return (
    <section id="projects" className="py-24 lg:py-32 bg-[#08080c] relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Rocket className="w-3.5 h-3.5" />
            <span>Portfolio Showcase</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-4 mb-6 rounded-full" />
          <p className="text-gray-400 text-base lg:text-lg max-w-2xl mx-auto">
            Production web platforms, DevOps hosting infrastructure, and real-world business solutions developed using the MERN stack.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-14">
          {[
            { id: "all", label: "All Projects" },
            { id: "featured", label: "Featured" },
            { id: "devops", label: "Cloud & DevOps" },
            { id: "fullstack", label: "Full Stack MERN" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                filter === tab.id
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 scale-105"
                  : "glass-panel text-gray-300 hover:text-white hover:border-purple-500/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id || idx}
              className="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between group"
            >
              <div>
                {/* Image Banner with Badge */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[#11111b]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-transparent to-transparent opacity-80" />

                  {project.featured && (
                    <span className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 space-y-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>

                  {project.tagline && (
                    <p className="text-purple-400/90 text-xs sm:text-sm font-medium">
                      {project.tagline}
                    </p>
                  )}

                  <p className="text-gray-300 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights if present */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="pt-2 space-y-1.5">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                        Key Highlights:
                      </span>
                      {project.highlights.slice(0, 3).map((hl, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-gray-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="pt-3 flex flex-wrap gap-2">
                    {project.techStack &&
                      project.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs px-2.5 py-1 bg-purple-500/10 text-purple-300 rounded-md border border-purple-500/20 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 sm:p-8 pt-0 flex gap-4">
                {project.liveLink && project.liveLink !== "#" && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md shadow-purple-600/20 hover:scale-[1.02]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}

                <a
                  href={project.githubLink || "https://github.com/saifcodes13"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 glass-panel hover:bg-white/10 text-gray-200 hover:text-white py-2.5 px-4 rounded-xl text-sm font-semibold border border-white/10 transition-all duration-300 hover:scale-[1.02]"
                >
                  <Github className="w-4 h-4 text-purple-400" />
                  Source Code
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;

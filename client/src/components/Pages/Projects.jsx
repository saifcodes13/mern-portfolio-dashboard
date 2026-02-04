import React, { useEffect, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { fetchProjects } from "../../api/portfolioApi";

const Projects = () => {
  const [projects, setProjects] = useState(() => {
    const cached = localStorage.getItem("projects")
    return cached ? JSON.parse(cached): []
  }); 
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
        localStorage.setItem("projects", JSON.stringify(data))
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    loadData();
  }, []);
  if (!projects) return null;

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.featured);

  return (
    <section id="projects" className="py-20 lg:py-32 bg-[#111111] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Featured <span className="text-purple-400">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-purple-400 mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Some of my recent work showcasing full-stack development skills
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-md font-medium transition ${
              filter === "all"
                ? "bg-purple-600 text-white"
                : "border border-purple-400/30 text-purple-400 hover:bg-purple-400/10"
            }`}
          >
            All Projects
          </button>

          <button
            onClick={() => setFilter("featured")}
            className={`px-6 py-2 rounded-md font-medium transition ${
              filter === "featured"
                ? "bg-purple-600 text-white"
                : "border border-purple-400/30 text-purple-400 hover:bg-purple-400/10"
            }`}
          >
            Featured
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-[#0a0a0a] rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition hover:scale-105"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {project.featured && (
                  <span className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs px-3 py-1 bg-purple-600/10 text-purple-400 rounded-full border border-purple-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-4">
                  {project.liveLink && project.liveLink !== "#" && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}

                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 border border-purple-400/30 text-purple-400 hover:bg-purple-400/10 py-2 rounded-md"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

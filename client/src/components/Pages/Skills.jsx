import React, { useEffect, useState } from "react";
import { fetchSkills } from "../../api/portfolioApi";

const Skills = () => {
  const[skills, setSkills] = useState()

  useEffect(() => {
    const loadData = async () => {
      try{
        const data = await fetchSkills()
        setSkills(data)
      } catch(error){
        console.error("Failed to fetch skills:", error)
      }
      
    }
    loadData()
  },[])

  if(!skills) return null
  return (
    <section id="skills" className="py-20 lg:py-32 bg-[#0a0a0a] relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Skills & <span className="text-purple-400">Expertise</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-purple-400 mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Frontend Skills */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-2 h-8 bg-gradient-to-b from-purple-600 to-purple-400 rounded-full"></div>
              Frontend Development
            </h3>
            <div className="space-y-4">
              {skills.frontend.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium">
                      {skill.name}
                    </span>
                    <span className="text-purple-400 text-sm">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-[#111111] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Skills */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-2 h-8 bg-gradient-to-b from-purple-600 to-purple-400 rounded-full"></div>
              Backend Development
            </h3>
            <div className="space-y-4">
              {skills.backend.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium">
                      {skill.name}
                    </span>
                    <span className="text-purple-400 text-sm">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-[#111111] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tools & Technologies */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Tools & Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.tools.map((tool, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-[#111111] text-gray-300 rounded-lg border border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-600/10 hover:text-purple-400 transition-all duration-300 hover:transform hover:scale-105 cursor-default"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

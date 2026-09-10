import React from "react";
import { GraduationCap, Award, BookOpen, Calendar } from "lucide-react";
import { educationData } from "../data/portfolioData";

const Education = () => {
  return (
    <section id="education" className="py-20 lg:py-28 bg-[#0c0c14] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic & Professional Credentials</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Education & <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">Training</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Education Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {educationData.map((edu, index) => (
            <div
              key={index}
              className="glass-panel glass-panel-hover p-8 rounded-2xl border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400">
                    {index === 0 ? <Award className="w-7 h-7" /> : <BookOpen className="w-7 h-7" />}
                  </div>
                  <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-800/40 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {edu.period}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                  {edu.degree}
                </h3>
                <h4 className="text-purple-400 font-medium text-base mb-4">
                  {edu.institution}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {edu.details}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
                {edu.skillsLearned.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs px-2.5 py-1 bg-white/5 text-gray-300 rounded-md border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

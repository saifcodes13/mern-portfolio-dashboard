import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight } from "lucide-react";
import { experiences } from "../data/portfolioData";
import Section, { SectionHeader } from "./ui/Section.jsx";
import Reveal from "./ui/Reveal.jsx";

const Experience = () => {
  return (
    <Section id="experience" labelledBy="experience-heading" glow="left">
      <SectionHeader
        id="experience-heading"
        eyebrow="Track Record"
        icon={Briefcase}
        title="Work"
        highlight="Experience"
        description="Production experience building CRM modules, REST APIs, and high-performance interfaces for real businesses."
      />

        {/* Timeline Container */}
        <div className="relative border-l-2 border-purple-500/20 ml-4 md:ml-32 space-y-12">
          {experiences.map((exp, index) => (
            <Reveal key={exp.id || index} className="relative pl-8 md:pl-12 group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#08080c] border-2 border-purple-400 group-hover:border-indigo-300 group-hover:scale-125 transition-all duration-300">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mx-auto mt-0.5 group-hover:bg-indigo-300" />
              </div>

              {/* Date tag for desktop on the left */}
              {exp.period && (
                <div className="hidden md:block absolute -left-36 top-1 text-right w-28">
                  <span className="text-xs font-mono font-medium text-purple-300/80 bg-purple-950/40 px-2.5 py-1 rounded-md border border-purple-800/40">
                    {exp.period}
                  </span>
                </div>
              )}

              {/* Card */}
              <div className="surface lift p-6 lg:p-8 rounded-2xl border border-white/10 relative">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl lg:text-2xl font-bold text-white tracking-wide">
                        {exp.role}
                      </h3>
                      {exp.badge && (
                        <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm">
                          {exp.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-purple-400 font-medium text-sm lg:text-base mt-1">
                      <span className="text-purple-300 font-semibold">{exp.company}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400 flex items-center gap-1 text-xs sm:text-sm">
                        <MapPin className="w-3.5 h-3.5 text-purple-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Date display */}
                  {exp.period && (
                    <div className="md:hidden flex items-center gap-1.5 text-xs text-purple-300/90 font-mono bg-purple-900/30 px-2.5 py-1 rounded w-fit border border-purple-500/20">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-300 text-sm lg:text-base mb-5 leading-relaxed">
                  {exp.description}
                </p>

                {/* Key Achievements Bullet points */}
                <div className="space-y-2.5 mb-6">
                  {exp.achievements.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-1" />
                      <span className="text-gray-300 text-sm leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2 items-center">
                  <span className="text-xs text-gray-400 font-medium mr-1">Technologies:</span>
                  {exp.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-xs font-mono rounded-md border border-purple-500/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
    </Section>
  );
};

export default Experience;

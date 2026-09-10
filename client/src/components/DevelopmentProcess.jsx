import React from "react";
import { workflowSteps } from "../data/portfolioData";
import { GitPullRequest, Search, Palette, Code2, Rocket } from "lucide-react";

const stepIcons = [Search, Palette, Code2, Rocket];

const DevelopmentProcess = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#08080c] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <GitPullRequest className="w-3.5 h-3.5" />
            <span>Structured Client Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How I <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">Deliver Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-4 mb-6 rounded-full" />
          <p className="text-gray-400 text-base lg:text-lg max-w-2xl mx-auto">
            A battle-tested 4-step engineering process ensuring transparency, rapid feedback, and on-time production launches.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {workflowSteps.map((step, idx) => {
            const IconComponent = stepIcons[idx] || Code2;
            return (
              <div
                key={idx}
                className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-black font-mono text-purple-500/30 group-hover:text-purple-400/70 transition-colors">
                      {step.step}
                    </span>
                    <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-purple-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1 text-[11px] font-mono text-purple-400">
                  <span>Phase {step.step} Complete</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default DevelopmentProcess;

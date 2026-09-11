import React from "react";
import {
  Code,
  Layout,
  Server,
  Sparkles,
  Cloud,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Layers,
} from "lucide-react";
import { servicesData } from "../data/portfolioData";

const iconMap = {
  code: Code,
  layout: Layout,
  server: Server,
  sparkles: Sparkles,
  cloud: Cloud,
  wrench: Wrench,
};

const Services = () => {
  const handleInquire = (serviceTitle) => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      // Custom event to pre-select service in Contact form
      window.dispatchEvent(
        new CustomEvent("select-service", { detail: { service: serviceTitle } })
      );
    }
  };

  return (
    <section id="services" className="py-24 lg:py-32 bg-[#0a0a10] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineering <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">Capabilities</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-4 mb-6 rounded-full" />
          <p className="text-gray-400 text-base lg:text-lg max-w-2xl mx-auto">
            Core software engineering proficiencies across full-stack web development, system architecture, API design, and cloud deployments.
          </p>
        </div>

        {/* Services Grid (3x2) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service) => {
            const IconComponent = iconMap[service.icon] || Layers;
            return (
              <div
                key={service.id}
                className="glass-panel glass-panel-hover p-7 rounded-2xl border border-white/10 flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  {/* Icon & Badge Row */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:bg-purple-600/20 group-hover:text-purple-300 transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    {service.badge && (
                      <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-purple-300">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Bullet Points */}
                  <div className="space-y-2 mb-6">
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                  {service.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;

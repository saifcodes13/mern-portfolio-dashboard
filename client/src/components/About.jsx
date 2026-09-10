import React from "react";
import { Server, Layout, ShieldCheck, Cloud, Cpu, Code2, Sparkles, CheckCircle2 } from "lucide-react";
import { aboutData } from "../data/portfolioData";

const About = () => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-[#0c0c14] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Professional Profile</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            About <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Bio & Stat Counters (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed">
              <p>
                I am a passionate <strong className="text-white font-semibold">React.js and MERN Stack Developer</strong> with hands-on enterprise experience building scalable web applications and business solutions using <span className="text-purple-300">React.js, Node.js, Express.js, MongoDB, and MySQL</span>.
              </p>
              <p>
                Proficient in architecting responsive user interfaces, designing secure RESTful APIs with JWT authentication, and integrating cloud storage solutions like AWS S3. I have delivered production CRM modules, automated static deployment architectures (like CloudNest), and real-time healthcare locators (MedFinder).
              </p>
              <p>
                With a Bachelor of Engineering from the University of Mumbai, I combine analytical engineering rigour with modern frontend and backend development practices. Passionate about building scalable architectures, writing clean code, and delivering reliable software solutions.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {aboutData.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-4 rounded-xl text-center border border-white/10 hover:border-purple-500/40 transition-all duration-300"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Key Engineering Principles */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Core Engineering Strengths
              </h4>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Modular React & Redux Toolkit Architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Secure JWT Authentication & Role Gates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>AWS S3 & Cloudflare Tunnel Integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>High-Performance MySQL & MongoDB Queries</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Modern Feature Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex-shrink-0">
                <Layout className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1.5">
                  Frontend Engineering
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Translating complex Figma layouts into responsive, accessible UI components with React.js, Tailwind CSS, and custom hooks.
                </p>
              </div>
            </div>

            <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex-shrink-0">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1.5">
                  Backend & Database Systems
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Building scalable Node.js and Express.js REST APIs with robust validation, relational MySQL and NoSQL MongoDB modeling.
                </p>
              </div>
            </div>

            <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 flex-shrink-0">
                <Cloud className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1.5">
                  Cloud, Hosting & DevOps
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Self-hosting infrastructures with Nginx reverse proxy, Cloudflare Tunnels, PM2 process management, and GitHub Actions CI/CD.
                </p>
              </div>
            </div>

            <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1.5">
                  Production Reliability
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Ensuring zero-downtime deployments, responsive cross-device testing, and clean, modular code architectures.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;

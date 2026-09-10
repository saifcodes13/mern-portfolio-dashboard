import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Phone,
  Sparkles,
  MapPin,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { fetchPersonalInfo } from "../api/portfolioApi";
import { personalInfo as defaultInfo } from "../data/portfolioData";

const Hero = () => {
  const [personalInfo, setPersonalInfo] = useState(() => {
    const cached = localStorage.getItem("personalInfo");
    return cached ? JSON.parse(cached) : defaultInfo;
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPersonalInfo();
        if (data) {
          setPersonalInfo(data);
          localStorage.setItem("personalInfo", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Failed to fetch personal info:", error);
      }
    };

    loadData();
  }, []);

  const info = personalInfo || defaultInfo;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 bg-[#08080c] bg-grid-pattern"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-violet-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium shadow-lg shadow-emerald-500/10 hover:border-emerald-400 transition-all duration-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-semibold">Available for Projects & Roles</span>
            <span className="text-gray-500">|</span>
            <span className="text-purple-300 font-semibold">Full-Stack Development Studio & Portfolio</span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none">
              <span className="text-gray-400 text-2xl sm:text-3xl lg:text-4xl font-normal block mb-2">
                Hello, I'm
              </span>
              <span className="bg-gradient-to-r from-white via-gray-100 to-purple-200 bg-clip-text text-transparent">
                {info.name || "Saif Tandel"}
              </span>
            </h1>

            <div className="text-xl sm:text-3xl lg:text-4xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-500 bg-clip-text text-transparent">
                Full-Stack Web Apps, Custom SaaS & Digital Solutions
              </span>
            </div>
          </div>

          {/* Tagline / Pitch */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Specializing in building scalable business applications with <span className="text-purple-300 font-medium">React.js, Node.js, Express.js, MongoDB, and MySQL</span>. Providing end-to-end client services from MVP development to enterprise CRM systems, cloud deployments, and custom APIs.
          </p>

          {/* Location & Quick Credential Pill */}
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400 flex-wrap">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-purple-400" />
              {info.location || "Mumbai, India"}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Full-Stack & Client Solutions
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Custom CRM & Cloud Ready
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#services"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-7 py-3.5 text-base font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-purple-600/30 hover:scale-105"
            >
              Explore Services
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#projects"
              className="inline-flex items-center gap-2 glass-panel hover:bg-white/10 text-gray-200 hover:text-white px-7 py-3.5 text-base font-semibold rounded-xl border border-white/15 transition-all duration-300 hover:scale-105"
            >
              View Portfolio Work
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 glass-panel hover:bg-white/10 text-gray-200 hover:text-white px-7 py-3.5 text-base font-semibold rounded-xl border border-purple-500/30 text-purple-300 transition-all duration-300 hover:scale-105"
            >
              <Mail className="w-4 h-4 text-purple-400" />
              Request a Quote
            </a>

            <a
              href={info.whatsapp || "https://wa.me/919819803103"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 px-6 py-3.5 text-base font-semibold rounded-xl border border-emerald-500/30 transition-all duration-300 hover:scale-105"
            >
              <span>WhatsApp Chat</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-5 pt-4">
            <a
              href={info.github || "https://github.com/saifcodes13"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-panel rounded-xl text-gray-300 hover:text-purple-400 hover:border-purple-500/50 transition-all duration-300 hover:scale-110 shadow-sm"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={info.linkedin || "https://linkedin.com/in/saif-tandel"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-panel rounded-xl text-gray-300 hover:text-purple-400 hover:border-purple-500/50 transition-all duration-300 hover:scale-110 shadow-sm"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${info.email || "saifcodes13@gmail.com"}`}
              className="p-3 glass-panel rounded-xl text-gray-300 hover:text-purple-400 hover:border-purple-500/50 transition-all duration-300 hover:scale-110 shadow-sm"
              aria-label="Email Contact"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href={`tel:${info.phone || "+919819803103"}`}
              className="p-3 glass-panel rounded-xl text-gray-300 hover:text-purple-400 hover:border-purple-500/50 transition-all duration-300 hover:scale-110 shadow-sm"
              aria-label="Phone Contact"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>

          {/* Floating Tech Badges strip */}
          <div className="pt-10 border-t border-white/10 max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-4">
              Core Technologies & Architecture
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {[
                "React.js",
                "Node.js",
                "Express.js",
                "MongoDB",
                "MySQL",
                "RESTful APIs",
                "AWS S3",
                "Tailwind CSS",
                "Cloudflare Tunnel",
                "GitHub Actions",
                "Nginx",
              ].map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-purple-300 hover:border-purple-500/30 transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Service & Client Trust Highlights */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-gray-400 font-medium">
              <span className="flex items-center gap-1.5 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Fast Turnaround & Sprints
              </span>
              <span className="flex items-center gap-1.5 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                Clean Modular Code
              </span>
              <span className="flex items-center gap-1.5 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                100% Production-Ready
              </span>
              <span className="flex items-center gap-1.5 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                End-to-End Client Delivery
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

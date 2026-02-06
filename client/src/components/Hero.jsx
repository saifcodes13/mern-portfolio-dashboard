import React, { useEffect, useState } from "react";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { fetchPersonalInfo } from "../api/portfolioApi";

/**
 * Initializes `personalInfo` state using cached data from localStorage.
 *
 * - Uses lazy initialization so this logic runs ONLY on the first render.
 * - On browser refresh:
 *   → React state resets
 *   → Data is read from localStorage instead of calling the API again.
 *
 * - If cached data exists:
 *   → It is parsed and used as the initial state.
 *
 * - If no cached data exists:
 *   → State is initialized as `null`
 *   → API will be called once and the result will be stored in localStorage.
 *
 * Benefits:
 * - Prevents unnecessary API refetches on page refresh
 * - Improves performance and load time
 */

const Hero = () => {
  const [personalInfo, setPersonalInfo] = useState(() => {
    const cached = localStorage.getItem("personalInfo");
    return cached ? JSON.parse(cached) : null;
  }); // Uses cached data to prevent API refetch on browser refresh.

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPersonalInfo();
        setPersonalInfo(data);
        localStorage.setItem("personalInfo", JSON.stringify(data));
      } catch (error) {
        console.error("Failed to fetch personal info:", error);
      }
    };

    loadData();
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/*  Background (CLS safe) */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite] opacity-70"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-800/10 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite] opacity-70"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          {/* Greeting */}
          <div className="inline-block">
            <span className="text-purple-400 text-sm lg:text-base font-medium tracking-wider uppercase border border-purple-400/30 px-4 py-2 rounded-full bg-purple-400/5 backdrop-blur-sm">
              Welcome to my portfolio
            </span>
          </div>

          {/* Name */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight">
            <span className="block text-white mb-2">Hi, I'm</span>
            <span className="block bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              Saif Tandel
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light min-h-[3rem]">
           Full-stack developer focused on performance and clean code.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <a
              href="/projects"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg font-medium rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-600/50 group"
            >
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            {/* <a
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-6 text-lg font-medium rounded-md transition-all duration-300 hover:scale-105 group"
            >
              <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              Download Resume
            </a> */}
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 pt-8">
            {personalInfo && (
              <>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

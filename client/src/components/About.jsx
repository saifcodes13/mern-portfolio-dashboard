import React from "react";
import { User, Target, Code } from "lucide-react";


const About = () => {
  
  return (
    <section id="about" className="py-20 lg:py-32 bg-[#0a0a0a] relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            About <span className="text-purple-400">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-purple-400 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a passionate Full Stack Developer with expertise in building modern web applications that solve real-world problems. With a strong foundation in both frontend and backend technologies, I create seamless, user-centric digital experiences.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              I specialize in the MERN stack and focus on writing clean, maintainable code. Currently working on MedFinder, a platform helping local communities find medicines in nearby medical stores. I'm always excited to take on new challenges and collaborate on innovative projects.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center p-4 bg-[#111111] rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <div className="text-3xl font-bold text-purple-400 mb-1">3+</div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
              <div className="text-center p-4 bg-[#111111] rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <div className="text-3xl font-bold text-purple-400 mb-1">10+</div>
                <div className="text-sm text-gray-400">Technologies</div>
              </div>
              <div className="text-center p-4 bg-[#111111] rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <div className="text-3xl font-bold text-purple-400 mb-1">100%</div>
                <div className="text-sm text-gray-400">Committed</div>
              </div>
            </div>
          </div>

          {/* Right: Feature Cards */}
          <div className="space-y-6">
            <div className="p-6 bg-[#111111] rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105 group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-600/10 rounded-lg group-hover:bg-purple-600/20 transition-colors duration-300">
                  <User className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Who I Am</h3>
                  <p className="text-gray-400">
                    A dedicated developer passionate about creating efficient, scalable solutions that make a difference.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#111111] rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105 group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-600/10 rounded-lg group-hover:bg-purple-600/20 transition-colors duration-300">
                  <Code className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">What I Do</h3>
                  <p className="text-gray-400">
                    Build full-stack web applications using modern technologies like React, Node.js, and MongoDB.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#111111] rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105 group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-600/10 rounded-lg group-hover:bg-purple-600/20 transition-colors duration-300">
                  <Target className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">My Goal</h3>
                  <p className="text-gray-400">
                    Help businesses and individuals bring their ideas to life through clean, maintainable code.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

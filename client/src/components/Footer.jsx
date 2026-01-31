import React, { useEffect, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchPersonalInfo } from "../api/portfolioApi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [personalInfo, setPersonalInfo] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPersonalInfo();
        setPersonalInfo(data);
      } catch (error) {
        console.error("Failed to fetch footer data", error);
      }
    };
    loadData();
  }, []);

  if (!personalInfo) return null;

  return (
    <footer className="bg-[#0a0a0a] border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              {personalInfo.name}
            </h3>
            <p className="text-gray-400 text-sm">
              Full Stack Developer passionate about building scalable web applications.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/about"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm"
              >
                About
              </Link>
              <Link
                to="/projects"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm"
              >
                Projects
              </Link>
              <Link
                to="/skills"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm"
              >
                Skills
              </Link>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Connect</h4>
            <div className="flex gap-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#111111] rounded-lg border border-purple-500/20 hover:border-purple-500/40 text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#111111] rounded-lg border border-purple-500/20 hover:border-purple-500/40 text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2 bg-[#111111] rounded-lg border border-purple-500/20 hover:border-purple-500/40 text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-purple-500/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} {personalInfo.name}.
          </p>
          <p className="text-gray-400 text-sm">
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

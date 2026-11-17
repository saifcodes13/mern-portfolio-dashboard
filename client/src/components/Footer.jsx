import { Github, Linkedin, Mail, Phone, Heart, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { personalInfo as defaultInfo } from "../data/portfolioData";
import { usePortfolio } from "../context/PortfolioContext.jsx";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { personalInfo: contextInfo } = usePortfolio();
  const info = contextInfo || defaultInfo;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#060609]/80 border-t border-white/10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-32 bg-purple-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 pb-24 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Status */}
          <div className="space-y-4 lg:col-span-2">
            <Link to="/" className="inline-block" aria-label="Saif Tandel, home">
              <span className="text-2xl font-black bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                Saif Tandel
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              Freelance full-stack developer in Dubai building web apps, CRMs, dashboards, and websites for startups and growing businesses.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 motion-safe:animate-pulse" aria-hidden="true" />
              <span>Available for new projects</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h2 className="text-white font-bold text-sm uppercase tracking-wider">
              Navigation
            </h2>
            <nav aria-label="Footer" className="flex flex-col space-y-2 text-sm text-gray-400">
              <Link to="/" className="hover:text-purple-400 transition-colors">
                Home
              </Link>
              <Link to="/services" className="hover:text-purple-400 transition-colors">
                Services
              </Link>
              <Link to="/projects" className="hover:text-purple-400 transition-colors">
                Projects
              </Link>
              <Link to="/blogs" className="hover:text-purple-400 transition-colors">
                Blog
              </Link>
              {/* Experience hidden for now
              <Link to="/experience" className="hover:text-purple-400 transition-colors">
                Work Experience
              </Link> */}
              <Link to="/skills" className="hover:text-purple-400 transition-colors">
                Skills
              </Link>
              <Link to="/contact" className="hover:text-purple-400 transition-colors">
                Get a Free Quote
              </Link>
            </nav>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="space-y-4">
            <h2 className="text-white font-bold text-sm uppercase tracking-wider">
              Direct Contact
            </h2>
            <div className="space-y-2 text-sm text-gray-400">
              <div>
                <a
                  href={`mailto:${info.email || "saifcodes13@gmail.com"}`}
                  className="hover:text-purple-400 transition-colors block truncate"
                >
                  {info.email || "saifcodes13@gmail.com"}
                </a>
              </div>
              <div>
                <a
                  href={`tel:${info.phone ? info.phone.replace(/\s+/g, '') : "+971581702009"}`}
                  className="hover:text-purple-400 transition-colors block"
                >
                  {info.phone || "+971 581702009"}
                </a>
              </div>
              <div className="text-xs text-gray-500 pt-1">
                {info.location || "Dubai, United Arab Emirates"}
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              <a
                href={info.github || "https://github.com/saifcodes13"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 surface rounded-xl text-gray-400 hover:text-purple-400 hover:border-purple-500/30 transition-[color,border-color,transform] duration-300 ease-out hover:-translate-y-0.5"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={info.linkedin || "https://linkedin.com/in/saif-tandel"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 surface rounded-xl text-gray-400 hover:text-purple-400 hover:border-purple-500/30 transition-[color,border-color,transform] duration-300 ease-out hover:-translate-y-0.5"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${info.email || "saifcodes13@gmail.com"}`}
                className="p-2.5 surface rounded-xl text-gray-400 hover:text-purple-400 hover:border-purple-500/30 transition-[color,border-color,transform] duration-300 ease-out hover:-translate-y-0.5"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        <p className="wordmark mb-6" aria-hidden="true">Saifcodes</p>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {currentYear} Saif Tandel. </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-gray-400 hover:text-purple-400 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

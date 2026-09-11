import React, { useState, useEffect } from "react";
import { Menu, X, ShieldUser, Sparkles, MapPin } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Expertise", path: "/services", anchor: "#services" },
    { name: "Projects", path: "/projects", anchor: "#projects" },
    { name: "Blogs", path: "/blogs" },
    { name: "Experience", path: "/experience", anchor: "#experience" },
    { name: "Skills", path: "/skills", anchor: "#skills" },
    // { name: "Education", path: "/#education", isAnchorOnly: true },
    { name: "Contact", path: "/contact", anchor: "#contact" },
  ];

  const handleNavClick = (item) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === "/" && item.anchor) {
      const element = document.querySelector(item.anchor);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#08080c]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 lg:h-20">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <span className="text-xl lg:text-2xl font-black bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              Saifcodes
            </span>
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => handleNavClick(item)}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive && !item.isAnchorOnly
                      ? "text-purple-400 font-semibold"
                      : "text-gray-300 hover:text-purple-300"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <Link
              to="/admin/login"
              title="Admin Portal"
              className="text-gray-400 hover:text-purple-400 transition-colors p-1"
            >
              <ShieldUser className="w-5 h-5" />
            </Link>

            {/* CTA */}
            <Link
              to="/contact"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md shadow-purple-600/20 hover:scale-105"
            >
              Request a Quote
            </Link>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              to="/admin/login"
              className="text-gray-400 hover:text-purple-400 p-1"
              title="Admin Portal"
            >
              <ShieldUser className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-200 hover:text-purple-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0c0c14]/98 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => handleNavClick(item)}
                className={({ isActive }) =>
                  `text-base font-medium py-1.5 transition-colors ${
                    isActive && !item.isAnchorOnly
                      ? "text-purple-400 font-semibold"
                      : "text-gray-300 hover:text-purple-400"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 rounded-xl"
              >
                Request a Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

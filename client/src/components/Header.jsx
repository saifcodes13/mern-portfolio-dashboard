import React, { useState, useEffect } from "react";
import { Menu, X, ShieldUser } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            Saifcodes
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm lg:text-base font-medium transition-colors ${
                    isActive
                      ? "text-purple-400"
                      : "text-gray-300 hover:text-purple-400"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <Link
              to="/admin/login"
              className="text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm font-bold"
            >
              <ShieldUser />
            </Link>

            {/* CTA */}

            <Link
              to="/contact"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition hover:scale-105"
            >
              Get In Touch
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-purple-400 transition"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#111111] border-t border-white/10">
          <nav className="flex flex-col space-y-4 px-6 py-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-base font-medium transition ${
                    isActive
                      ? "text-purple-400"
                      : "text-gray-300 hover:text-purple-400"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <Link
              to="/admin/login"
              className="text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm font-bold"
            >
              <ShieldUser />
            </Link>

            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-purple-600 hover:bg-purple-700 text-white text-center py-2 rounded-md transition"
            >
              Get In Touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

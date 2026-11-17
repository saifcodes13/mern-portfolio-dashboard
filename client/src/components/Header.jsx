import { useState, useEffect } from "react";
import { Menu, X, ShieldUser, ArrowRight } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import QuoteLink from "./ui/QuoteLink.jsx";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blogs" },
  // { name: "Experience", path: "/experience" }, // hidden for now
  { name: "Skills", path: "/skills" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);
  const solid = isScrolled || isMobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        solid
          ? "bg-[#08080c]/85 backdrop-blur-xl border-white/10 shadow-lg shadow-black/30"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isScrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            aria-label="Saifcodes, home"
            className="flex items-center gap-2 group"
          >
            <span className="text-xl lg:text-2xl font-black tracking-tight bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Saifcodes
            </span>
            <span
              aria-hidden="true"
              className="w-2 h-2 rounded-full bg-purple-500 transition-transform duration-500 ease-out group-hover:scale-150"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `nav-link text-sm font-medium transition-colors duration-300 ${
                    isActive ? "text-white" : "text-gray-300 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/admin/login"
              title="Admin Portal"
              aria-label="Admin portal"
              className="text-gray-500 hover:text-purple-300 transition-colors duration-300 p-1"
            >
              <ShieldUser className="w-5 h-5" aria-hidden="true" />
            </Link>

            <QuoteLink className="btn btn-sm btn-primary">
              Get a Free Quote
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </QuoteLink>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/admin/login"
              className="text-gray-500 hover:text-purple-300 p-2"
              title="Admin Portal"
              aria-label="Admin portal"
            >
              <ShieldUser className="w-5 h-5" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="relative w-10 h-10 flex items-center justify-center text-gray-200 hover:text-white rounded-xl cursor-pointer"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu
                size={24}
                aria-hidden="true"
                className={`absolute transition-[opacity,transform] duration-300 ease-out ${
                  isMobileMenuOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100"
                }`}
              />
              <X
                size={24}
                aria-hidden="true"
                className={`absolute transition-[opacity,transform] duration-300 ease-out ${
                  isMobileMenuOpen ? "opacity-100" : "opacity-0 -rotate-90 scale-75"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer: stays mounted so it can animate open and closed */}
      <div
        id="mobile-menu"
        className="mobile-menu lg:hidden"
        data-open={isMobileMenuOpen}
        inert={!isMobileMenuOpen}
      >
        <div className="overflow-hidden">
          <nav
            aria-label="Mobile"
            className="flex flex-col px-5 sm:px-6 pt-2 pb-6 border-t border-white/[0.07]"
          >
            {navItems.map((item, idx) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                onClick={closeMenu}
                style={{ "--i": idx }}
                className={({ isActive }) =>
                  `mobile-menu__item py-3 text-base font-medium border-b border-white/[0.05] transition-colors ${
                    isActive ? "text-purple-300" : "text-gray-200 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <div className="mobile-menu__item pt-5" style={{ "--i": navItems.length }}>
              <QuoteLink onClick={closeMenu} className="btn btn-primary w-full">
                Get a Free Quote
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </QuoteLink>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

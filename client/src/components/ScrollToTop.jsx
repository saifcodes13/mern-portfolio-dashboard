import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 250);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Stays mounted so it can fade in/out; inert + hidden from AT while off-screen
  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      inert={!isVisible}
      className={`fixed bottom-6 right-6 z-50 p-3.5 rounded-2xl bg-[#12121c]/90 text-purple-300 border border-purple-500/30 shadow-xl shadow-purple-600/20 backdrop-blur-md hover:bg-purple-600 hover:text-white hover:border-purple-400 transition-[opacity,transform,background-color,color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-5 h-5 motion-safe:group-hover:-translate-y-1 transition-transform duration-300" aria-hidden="true" />
    </button>
  );
};

export default ScrollToTop;

import { useEffect } from "react";
import { Outlet, useLocation, useNavigationType } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import WhatsAppButton from "../components/WhatsAppButton";
import CtaBand from "../components/CtaBand.jsx";

const MainLayout = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  // New page -> start at the top (instantly, so it doesn't fight the route
  // transition). Back/forward keeps the browser's restored position.
  useEffect(() => {
    if (navigationType !== "POP") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, navigationType]);

  // Home has its own CTA band before the contact section; the contact page is the destination itself.
  const showCtaBand = pathname !== "/" && pathname !== "/contact";

  return (
    <div className="relative isolate min-h-screen text-white">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      {/* cohesive fixed backdrop behind every section */}
      <div className="site-backdrop" aria-hidden="true" />

      <Header />
      <main id="main" key={pathname} className="page-enter">
        <Outlet />
        {showCtaBand && <CtaBand />}
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </div>
  );
};

export default MainLayout;

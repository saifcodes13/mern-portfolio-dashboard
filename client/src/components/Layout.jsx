import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;

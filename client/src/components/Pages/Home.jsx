import Hero from "../Hero.jsx";
import TrustStrip from "../TrustStrip.jsx";
import Services from "../Services.jsx";
import Projects from "./Projects.jsx";
import DevelopmentProcess from "../DevelopmentProcess.jsx";
import About from "../About.jsx";
// import Experience from "../Experience.jsx"; // hidden for now
import Skills from "./Skills.jsx";
import CtaBand from "../CtaBand.jsx";
import StatementMarquee from "../StatementMarquee.jsx";
import Faq from "../Faq.jsx";
import Contact from "./Contact.jsx";
import Seo from "../ui/Seo.jsx";

const Home = () => {
  return (
    <>
      <Seo
        title="Saif Tandel | Freelance Web Developer in Dubai – Web Apps, CRMs & Websites"
        description="Freelance full-stack web developer in Dubai, UAE. I build custom web apps, CRMs, dashboards and high-converting websites for startups and businesses. Free consultation and fixed quotes."
        path="/"
      />
      <Hero />
      <TrustStrip />
      <Projects />
      <StatementMarquee />
      <Services />
      <DevelopmentProcess />
      <About />
      {/* Experience hidden for now */}
      {/* <Experience /> */}
      <Skills />
      <Faq />
      <CtaBand />
      <Contact />
    </>
  );
};

export default Home;

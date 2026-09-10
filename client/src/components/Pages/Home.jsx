import React from "react";
import Hero from "../Hero.jsx";
import Services from "../Services.jsx";
import Projects from "./Projects.jsx";
import DevelopmentProcess from "../DevelopmentProcess.jsx";
import About from "../About.jsx";
import Experience from "../Experience.jsx";
import Skills from "./Skills.jsx";
import Education from "../Education.jsx";
import Contact from "./Contact.jsx";

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <DevelopmentProcess />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Contact />
    </>
  );
};

export default Home;

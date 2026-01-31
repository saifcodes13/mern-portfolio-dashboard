import React from "react";
import Hero from "../Hero.jsx";
import About from "../About.jsx";
import Projects from "./Projects.jsx";
import Skills from "./Skills.jsx";
import Contact from "./Contact.jsx";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Projects/>
      <Skills />
      <Contact />
    </>
  );
};

export default Home;

//--- import library ----------
import React from "react";
import Footer from "../footer/Footer";
//--- import components ----------
import Navbar from "../navbar/Navbar";
import HeroSection from "./HeroSection";
import About from "../about/About";
import Services from "../service/Services";
import Contact from "../contact/contact";
//--- import css style file
import "./home.style.css";
function Home() {
  return (
    <>
      <main className="home flex flex-col items-center">
        <section id="hero" className="h-screen w-full md:w-[90%] pt-[100px]  ">
          <Navbar />
          <HeroSection />
        </section>
        <section
          id="service"
          className="min-h-screen w-full md:w-[90%] pt-[100px]"
        >
          <Services />
        </section>
        <section id="about" className="  w-full md:w-[90%] pt-[100px] ">
          <About />
        </section>
        <section id="contac" className="  w-full md:w-[90%] pt-[100px] ">
          <Contact />
        </section>
        <Footer />
      </main>
    </>
  );
}

export default Home;

import React from "react";
import { Link } from "react-router-dom";
import image from "../../assets/images/undraw_pair_programming_re_or4x.svg";
import "./home.style.css";
function HeroSection() {
  return (
    <section
      className="w-[95%] m-auto flex flex-col md:flex-row items-center
     justify-evenly gap-y-5 hero-section h-[100%] "
    >
      <div className={`w-[95%] sm:w-[75%] md:w-[60%] lg:w-[45%]`}>
        <h1 className="text-2xl lg:text-[2rem] text-center font-serif font-bold text-lochmara-900">
          The difference will be innovation, Kazh Group will make you different
        </h1>
        <div className="text-center text-[14px] w-[90%] m-auto mt-5 text-slate-700">
          Kazh Group is a leading software company that specializes in
          developing innovative solutions for businesses. With a team of skilled
          professionals, they provide custom software development, web and
          mobile app development, and IT consulting services
        </div>
      </div>
      <div
        className={`w-[95%] sm:w-[75%] md:w-[60%] lg:w-[45%] btn overflow-hidden p-1`}
      >
        <img src={image} className="h-full w-full object-cover" />
      </div>
    </section>
  );
}

export default HeroSection;

import React from "react";
import aboutImage from "../assets/images/about_img.svg";

const About = () => {
  return (
    <section className="relative z-10 min-h-screen flex flex-col gap-5 items-center justify-center px-8 mt-8">
      <div className="text-center mt-20">
        <img src={aboutImage} alt="About Venthrapy" className="mb-6 w-148" />
      </div>
      <div className="text-center">
        <h2 className="text-5xl max-w-3xl font-bold font-instrument italic text-primary mx-auto">
          About us
        </h2>
        <p className="text-2xl max-w-5xl font-inter-tight text-primary mx-auto mt-4">
          Venthrapy is a movement toward making mental health care approachable,
          everyday, and human.
        </p>
        <p className="text-2xl max-w-4xl font-inter-tight text-primary mx-auto">
          True well-being isn't in a one-hour session, it's in the small, daily
          actions we take, the stories we hear, and the spaces we belong to.
        </p>
      </div>
      <button className="relative group rounded-4xl px-6 py-2 font-semibold tracking-tight hover:shadow-2xl cursor-pointer bg-primary text-background border-3 border-transparent mt-10">
        Know more
        <span className="absolute left-full ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          →
        </span>
      </button>
    </section>
  );
};
export default About;

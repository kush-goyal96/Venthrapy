import React from "react";
import Banner from "../components/Banner";
import About from "../components/About";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="relative text-primary font-inter-tight w-full bg-cover bg-center bg-no-repeat bg-[url('/src/assets/images/bacground.svg')] flex flex-col overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[85%] -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[1400px] max-h-[1400px] bg-gradient-to-b from-[#2F91F2] from-5% via-[#25EBF5] via-20% to-transparent to-35% rounded-full blur-3xl z-0 opacity-95"
      />
      <Banner />
      <About />
    </div>
  );
};

export default Home;

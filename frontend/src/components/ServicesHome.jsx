import React from "react";
import ServiceCard from "./ServiceCard";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { services } from "../assets/assets";

const ServicesHome = () => {
  return (
    <div className="relative text-primary w-full flex flex-col min-h-screen">
      <main className="z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-secondary italic font-semibold">
            Our Services
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ServicesHome;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { services } from "../assets/assets";
import ellipse from "../assets/images/ellipse_services.svg";
import ServiceCard from "../components/ServiceCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ServicesSection = () => {
  const servicesToRender = services;

  const Arrow = ({ onClick, direction }) => (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "next" ? "Next slide" : "Previous slide"}
      className={`absolute top-1/2 -translate-y-1/2 ${
        direction === "next" ? "right-2 sm:right-3" : "left-2 sm:left-3"
      } z-20 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-md ring-1 ring-gray-200 hover:bg-white transition focus:outline-none`}
    >
      <span className="sr-only">
        {direction === "next" ? "Next" : "Previous"}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`h-5 w-5 text-primary ${
          direction === "next" ? "rotate-180" : ""
        }`}
      >
        <path d="M13.289 4.293a1 1 0 0 1 1.414 1.414L9.414 11l5.289 5.293a1 1 0 1 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6z" />
      </svg>
    </button>
  );

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    dotsClass: "slick-dots !m-0 !p-0",
    centerMode: false,
    centerPadding: "0px",
    variableWidth: true,
    nextArrow: <Arrow direction="next" />,
    prevArrow: <Arrow direction="prev" />,
    // Tailwind-only custom dots
    appendDots: (dots) => (
      <div className="pt-6">
        <ul className="flex items-center gap-2">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <button
        aria-label={`Go to slide ${i + 1}`}
        className="w-2 h-2 rounded-full bg-blue-500/70"
      />
    ),
  };

  return (
    <section className="relative bg-[url('/src/assets/images/background.svg')] min-h-[100vh] overflow-hidden">
      <Navbar />
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24 z-10">
        <div className="grid lg:grid-cols-2 items-center min-h-[60vh]">
          {/* Left Side - Our Services Text with ellipse styling */}
          <div className="relative ml-10 mb-10">
            <div className="relative inline-block text-3xl lg:text-[120px] font-secondary italic font-medium text-primary leading-none">
              <h2 className="ml-10">Our</h2>
              <div className="relative mt-2 lg:w-108">
                <h2 className="relative z-20 leading-10">Services</h2>
                {/* Double ellipse accent */}
                <img
                  src={ellipse}
                  alt="ellipse"
                  className="absolute -left-10 -right-10 -top-7 -bottom-4 z-10 opacity-70 select-none pointer-events-none w-[900px]"
                />
                <img
                  src={ellipse}
                  alt="ellipse shadow"
                  className="absolute -left-14 -right-6 -top-10 -bottom-1 z-0 opacity-40 scale-95 translate-y-1 select-none pointer-events-none rotate-[-180deg]"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Services Carousel (1.5 cards visible) */}
          <div className="relative overflow-visible bg-transparent">
            <Slider {...sliderSettings}>
              {servicesToRender.map((service, index) => (
                <div
                  key={index}
                  className="px-2 pr-4 w-[560px] sm:w-[600px] lg:w-[640px]"
                >
                  <ServiceCard {...service} />
                </div>
              ))}
            </Slider>
            {/* Right boundary blur/fade */}
            <div className="pointer-events-none absolute top-0 right-0 h-full w-20 sm:w-24 lg:w-28 bg-gradient-to-l from-gray-200/95 via-gray-100/70 to-transparent"></div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default ServicesSection;

import React, { useEffect } from "react";
import MeditationCard from "../components/MeditationCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ellipse from "../assets/images/meditate_ellipse.svg";
import { useQuery } from "@tanstack/react-query";
import { fetchMeditations } from "../lib/api";
import toast from "react-hot-toast";

const Meditation = () => {
  return (
    <section className="relative bg-main-page min-h-[100vh] overflow-hidden">
      <Navbar isFixed />
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24 z-10">
        {(() => {
          // Move hooks to top-level of component render
          return null;
        })()}
        <div className="relative w-full text-center h-screen flex items-center justify-center -mt-8 sm:-mt-12">
          <h2 className="relative z-20 text-5xl lg:text-[72px] font-secondary italic font-medium text-primary leading-tight">
            What kind of meditation
            <br className="hidden sm:block" /> are you looking for?
          </h2>
          {/* Layered ellipse rings wrapped around text with slight rotation */}
          <img
            src={ellipse}
            alt="ellipse ring"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-200deg] z-10 opacity-15 select-none pointer-events-none max-w-[1100px] w-[95%]"
          />
          <img
            src={ellipse}
            alt="ellipse ring"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-50 select-none pointer-events-none max-w-[1100px] w-[91%]"
          />
          <img
            src={ellipse}
            alt="ellipse ring"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-60 select-none pointer-events-none max-w-[1100px] w-[87%]"
          />
          <img
            src={ellipse}
            alt="ellipse ring"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-205deg] z-0 opacity-15 select-none pointer-events-none max-w-[1100px] w-[98%]"
          />
        </div>

        <MeditationList />
      </div>
      <Footer />
    </section>
  );
};

const MeditationList = () => {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["meditations"],
    queryFn: fetchMeditations,
    staleTime: 60000,
    retry: 1,
  });
  useEffect(() => {
    if (isError) toast.error("Failed to load meditations");
  }, [isError]);
  return (
    <div
      id="library"
      className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center"
    >
      {isLoading && (
        <div className="col-span-full text-secondary">Loading...</div>
      )}
      {!isLoading &&
        data.map((m) => (
          <MeditationCard
            key={m.slug}
            title={m.title}
            duration={m.duration}
            slug={m.slug}
          />
        ))}
    </div>
  );
};

export default Meditation;

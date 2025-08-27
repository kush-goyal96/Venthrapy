import React from "react";
import Navbar from "./Navbar";
import LockToggle from "./LockToggle";

const Banner = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero content */}
      <div className="z-10 flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-[0.6]"></div>

        <div className="w-fit mx-auto">
          <div className="flex gap-10">
            <div className="font-instrument italic text-8xl leading-none tracking-wide">
              Unlock
            </div>
            <div>
              <LockToggle />
            </div>
          </div>

          <div className="text-8xl leading-none tracking-tight">
            Mental Health
          </div>

          <div className="text-5xl leading-none tracking-tight">
            where you are
          </div>
        </div>

        {/* Bottom spacer with button */}
        <div className="flex-1 flex items-end justify-center pb-16">
          <button className="rounded-4xl px-6 py-2 font-semibold tracking-tight text-lg hover:shadow-2xl cursor-pointer bg-background border-3 border-transparent">
            Book a session
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;

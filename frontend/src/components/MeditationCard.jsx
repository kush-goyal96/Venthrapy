import React from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const MeditationCard = ({ title, duration, slug }) => {
  const navigate = useNavigate();

  const handlePlay = () => {
    if (slug) navigate(`/meditation/${slug}`);
  };

  return (
    <div className="group relative h-72 w-72 sm:h-80 sm:w-80 rounded-4xl bg-tape-card border border-primary/30 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] hover:border-primary/50 focus-within:-translate-y-1">
      <div className="pointer-events-none absolute inset-0 rounded-4xl bg-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="text-background px-5 pt-5 pr-7 font-accent font-bold text-lg sm:text-xl leading-snug">
        {title}
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-center justify-between">
        <div className="text-background/90 text-lg">{duration}</div>
        <button
          type="button"
          aria-label="Play"
          onClick={handlePlay}
          className="text-background text-5xl hover:scale-105 transition-transform cursor-pointer"
        >
          <FaCirclePlay />
        </button>
      </div>
    </div>
  );
};

export default MeditationCard;

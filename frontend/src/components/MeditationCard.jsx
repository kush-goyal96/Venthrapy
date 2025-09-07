import React from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const MeditationCard = ({ title, duration, slug }) => {
  const navigate = useNavigate();

  const handlePlay = () => {
    if (slug) navigate(`/meditation/${slug}`);
  };

  return (
    <div className="relative h-72 w-72 sm:h-80 sm:w-80 rounded-4xl bg-cover bg-center bg-no-repeat bg-[url('/src/assets/images/tape_background.svg')] border border-primary/30 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <div className="text-background px-5 pt-5 pr-7 font-satoshi font-bold text-lg sm:text-xl leading-snug">
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

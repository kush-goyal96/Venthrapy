import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const ServiceCard = ({ title, subtitle, description, to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) navigate(to);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group w-72 sm:w-82 min-h-88 bg-background text-primary rounded-3xl cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-2 border-primary p-6 text-left flex flex-col justify-between transition-all duration-300 hover:shadow-[0_16px_50px_rgba(0,0,0,0.10)] hover:-translate-y-1 hover:border-primary/90 hover:bg-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6CB0]/40"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-4xl font-instrument italic">{title}</h3>
          {subtitle && (
            <p className="mt-1 text-[#2F6CB0] font-inter-tight">{subtitle}</p>
          )}
        </div>
        <span
          aria-hidden
          className="text-[#2F6CB0] text-xl transform transition-transform duration-300 group-hover:translate-x-1"
        >
          <FaArrowRight />
        </span>
      </div>

      <p className="mt-6 text-md leading-relaxed text-[#627089] font-inter-tight transition-colors duration-300 group-hover:text-[#4D5B77]">
        {description}
      </p>
    </button>
  );
};

export default ServiceCard;

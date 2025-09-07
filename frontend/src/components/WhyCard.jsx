import React from "react";

const WhyCard = ({ img, description }) => {
  return (
    <div className="w-72 sm:w-82 min-h-96 bg-background text-primary rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#EBEEF3] p-6 flex flex-col justify-between">
      <div className="h-12 w-12">
        <img src={img} alt="icon" className="h-full w-full object-contain" />
      </div>
      <p className="text-xl leading-snug font-inter-tight">{description}</p>
    </div>
  );
};

export default WhyCard;

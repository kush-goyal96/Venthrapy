import React from "react";
import { IoLanguage } from "react-icons/io5";

const TherapistCard = ({ therapist, onClick }) => {
  return (
    <div
      className="bg-white rounded-2xl border border-gray-200 shadow-sm w-[250px] h-[320px] flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer"
      onClick={onClick}
    >
      {/* Profile Image */}
      <div className="px-3 pt-3 pb-1">
        <div className="block overflow-hidden h-40">
          {therapist.image ? (
            <img
              src={therapist.image}
              alt={therapist.name}
              className="w-full h-full bg-blue-500/70 rounded-xl transition-transform duration-200 hover:scale-[1.02] object-contain"
            />
          ) : (
            <div className="w-full aspect-square bg-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-semibold text-xl">
                {therapist.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-3 pb-3 flex flex-col flex-grow">
        {/* Name */}
        <h3 className="text-base font-semibold text-heading mb-1">
          {therapist.name}
        </h3>

        {/* Specializations - Display as comma-separated text */}
        <div className="mb-2 flex-grow">
          <p className="text-xs text-secondary leading-tight">
            {therapist.specializations.join(", ")}
          </p>
        </div>

        <div className="flex items-center mb-2">
          <IoLanguage className="w-3 h-3 text-primary mr-1" />
          <span className="text-xs text-secondary">
            {therapist.languages.join(", ")}
          </span>
        </div>

        {/* Session Cost */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <span className="text-xs text-primary font-medium">Session Cost</span>
          <span className="text-base font-medium text-primary">
            {therapist.sessionCost}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TherapistCard;

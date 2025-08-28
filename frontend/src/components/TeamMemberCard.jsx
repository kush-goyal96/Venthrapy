import React from "react";
import PropTypes from "prop-types";

const TeamMemberCard = ({ name, role, image }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm w-[250px] h-[300px] flex flex-col">
      <div className="px-4 pt-4 pb-2">
        <div className="block overflow-hidden">
          <img
            src={image}
            alt={`${name} portrait`}
            className="w-full aspect-square bg-blue-500/70 rounded-xl"
          />
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="text-lg font-semibold text-gray-900 font-inter-tight">
          {name}
        </div>
        <div className="text-base text-gray-500 font-inter-tight">{role}</div>
      </div>
    </div>
  );
};

TeamMemberCard.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default TeamMemberCard;

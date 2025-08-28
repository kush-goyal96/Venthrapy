import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TeamMemberCard from "../components/TeamMemberCard";
import reactLogo from "../assets/react.svg";

const members = [
  { name: "Akshay Raj Dua", role: "Designer", image: reactLogo },
  { name: "Akshay Raj Dua", role: "Designer", image: reactLogo },
  { name: "Akshay Raj Dua", role: "Designer", image: reactLogo },
  { name: "Akshay Raj Dua", role: "Designer", image: reactLogo },
  { name: "Akshay Raj Dua", role: "Designer", image: reactLogo },
  { name: "Akshay Raj Dua", role: "Designer", image: reactLogo },
];

const Team = () => {
  return (
    <div>
      <Navbar />

      <div className="items-center justify-center w-full my-10">
        <div>
          <h1 className="font-instrument text-primary font-semibold text-center text-5xl italic">
            Meet the Team
          </h1>
        </div>
        <div className="max-w-6xl mx-auto mt-5 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          {members.map((m, idx) => (
            <TeamMemberCard key={`${m.name}-${idx}`} {...m} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Team;

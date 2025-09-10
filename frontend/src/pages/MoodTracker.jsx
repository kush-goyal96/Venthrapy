import React, { useState } from "react";
import { Slider, Box, Typography, Paper } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { X } from "lucide-react";
import logo from "../assets/images/favicon.svg";

const MoodTracker = () => {
  const [moodValue, setMoodValue] = useState(50); 

  const handleMoodChange = (event, newValue) => {
    setMoodValue(newValue);
  };

  // Determine mood category based on slider value
  const getMoodCategory = (value) => {
    if (value <= 33) return "very unpleasant";
    if (value <= 66) return "neutral";
    return "very pleasant";
  };

  // Get color based on mood value
  const getMoodColor = (value) => {
    if (value <= 33) return "#ef4444"; // red
    if (value <= 66) return "#eab308"; // yellow
    return "#22c55e"; // green
  };

  const moodCategory = getMoodCategory(moodValue);
  const moodColor = getMoodColor(moodValue);

  // Save mood data (you can extend this to save to localStorage or API)
  const saveMood = () => {
    const moodData = {
      value: moodValue,
      category: moodCategory,
      timestamp: new Date().toISOString(),
    };

    // For now, just log to console. You can extend this to save to localStorage or API
    console.log("Mood saved:", moodData);

    // Save to localStorage for persistence
    const existingMoods = JSON.parse(
      localStorage.getItem("moodHistory") || "[]"
    );
    existingMoods.push(moodData);
    localStorage.setItem("moodHistory", JSON.stringify(existingMoods));

    alert(`Mood saved: ${moodCategory}`);
  };

  // Generate vertical lines with varying heights
  const generateLines = () => {
    const lines = [];
    for (let i = 0; i < 40; i++) {
      const height = Math.random() * 80 + 15; // Random height between 15-55px
      lines.push(
        <div
          key={i}
          className="w-0.5 md:w-1 rounded-full"
          style={{
            height: `${height}px`,
            backgroundColor: moodColor,
            opacity: 0.6 + Math.random() * 0.4, // Random opacity between 0.6-1
          }}
        />
      );
    }
    return lines;
  };

  return (
    <div className="h-screen bg-cover bg-center bg-no-repeat bg-[url('/src/assets/images/background.svg')] flex flex-col font-inter-tight relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 md:px-12 md:py-6 relative z-10">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Ventthrapy Logo"
            className="cursor-pointer w-8 h-8 md:w-10 md:h-10 lg:w-20 lg:h-20"
          />
        </div>

        {/* Header Text */}
        <div className="text-center flex-1 px-4">
          <p className="text-gray-600 text-sm max-w-lg mx-auto font-satoshi leading-relaxed">
            This isn't about labelling yourself. It's about checking in with
            honesty and care.
          </p>
        </div>

        {/* Close Button */}
        <button className="w-8 h-8 flex items-center justify-center text-primary hover:bg-primary/10 rounded-full transition-colors cursor-pointer">
          <X size={32} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 md:px-12 pb-4 relative z-10 gap-6">
        {/* Vertical Lines Visual */}
        <div className="flex items-end justify-center gap-0.5 md:gap-1 mb-4 h-16 md:h-24">
          {generateLines()}
        </div>

        {/* Greeting */}
        <h2 className="text-primary text-5xl font-medium italic mb-1 font-instrument">
          Hello Eesha
        </h2>

        {/* Main Question */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 max-w-lg font-satoshi leading-tight">
          How do you feel about your <br /> current emotions?
        </h1>

        {/* Slider Container */}
        <div className="w-full max-w-sm md:max-w-md">
          <Slider
            value={moodValue}
            onChange={handleMoodChange}
            min={0}
            max={100}
            step={1}
            sx={{
              height: 12,
              "& .MuiSlider-track": {
                background: "#d1d5db", // Light gray color
                border: "none",
                height: 12,
              },
              "& .MuiSlider-rail": {
                background: "#e5e7eb", // Slightly lighter gray
                opacity: 1,
                height: 12,
              },
              "& .MuiSlider-thumb": {
                height: 28,
                width: 28,
                backgroundColor: "#527fc3", // Using primary color
                border: "3px solid white",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                },
                "&:focus": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                },
              },
            }}
          />
        </div>

        {/* Slider Labels */}
        <div className="flex justify-between w-full max-w-sm md:max-w-md text-sm text-gray-600 mb-2 font-satoshi">
          <span>VERY UNPLEASANT</span>
          <span>VERY PLEASANT</span>
        </div>

        {/* Instruction */}
        <p className="text-sm text-gray-500 text-center mb-2 font-satoshi">
          Drag the slider to select your mood of the day.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center px-8 py-4 md:px-12 md:py-6 relative z-10">
        <button className="px-4 md:px-6 py-2 cursor-pointer border-2 border-primary text-primary rounded-full font-medium hover:bg-primary/10 transition-colors font-satoshi text-sm md:text-base">
          Previous
        </button>

        <button
          onClick={saveMood}
          className="px-4 md:px-6 py-2 cursor-pointer bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors font-satoshi text-sm md:text-base"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MoodTracker;

import React, { useState } from "react";
import { Slider, Box, Typography, Paper } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import logo from "../assets/images/favicon.svg";
import MoodLines from "../components/MoodLines";
import MoodVeryUnpleasant from "./MoodVeryUnpleasant";
import MoodNeutral from "./MoodNeutral";
import MoodVeryPleasant from "./MoodVeryPleasant";

const MoodTracker = () => {
  const navigate = useNavigate();
  const [moodValue, setMoodValue] = useState(50);
  const [currentPage, setCurrentPage] = useState("mood-selector"); // "mood-selector", "emotion-selector"
  const [selectedMoodCategory, setSelectedMoodCategory] = useState(null);

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

  // Save mood data and show emotion selector
  const saveMood = () => {
    const moodData = {
      value: moodValue,
      category: moodCategory,
      timestamp: new Date().toISOString(),
    };

    // Save to localStorage for persistence
    const existingMoods = JSON.parse(
      localStorage.getItem("moodHistory") || "[]"
    );
    existingMoods.push(moodData);
    localStorage.setItem("moodHistory", JSON.stringify(existingMoods));

    // Set the mood category and switch to emotion selector
    setSelectedMoodCategory(moodCategory);
    setCurrentPage("emotion-selector");
  };

  // Handle going back to mood selector
  const handleBackToMoodSelector = () => {
    setCurrentPage("mood-selector");
    setSelectedMoodCategory(null);
  };

  // Render the appropriate page based on current state
  if (currentPage === "emotion-selector") {
    switch (selectedMoodCategory) {
      case "very unpleasant":
        return <MoodVeryUnpleasant onBack={handleBackToMoodSelector} />;
      case "neutral":
        return <MoodNeutral onBack={handleBackToMoodSelector} />;
      case "very pleasant":
        return <MoodVeryPleasant onBack={handleBackToMoodSelector} />;
      default:
        return <MoodNeutral onBack={handleBackToMoodSelector} />;
    }
  }

  return (
    <div className="h-screen bg-main-page flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 md:px-12 md:py-6 relative z-10">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Venthrapy Logo"
            className="cursor-pointer w-8 h-8 md:w-10 md:h-10 lg:w-20 lg:h-20"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Header Text */}
        <div className="text-center flex-1 px-4">
          <p className="text-secondary text-sm max-w-lg mx-auto font-accent leading-relaxed">
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
      <div className="flex-1 flex flex-col items-center justify-center px-8 md:px-12 pb-4 relative z-10">
        {/* Vertical Lines Visual */}
        <MoodLines moodColor={moodColor} />

        {/* Greeting */}
        <h2 className="text-primary text-5xl font-medium italic mb-1 font-secondary my-6">
          Hello Eesha
        </h2>

        {/* Main Question */}
        <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-4 max-w-lg font-accent leading-tight my-6">
          How do you feel about your <br /> current emotions?
        </h1>

        {/* Slider Container */}
        <div className="w-full max-w-sm md:max-w-md mt-6">
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
        <div className="flex font-medium justify-between w-full max-w-sm md:max-w-md text-sm font-accent leading-none text-primary mb-6 tracking-tight">
          <span>VERY UNPLEASANT</span>
          <span>VERY PLEASANT</span>
        </div>

        {/* Instruction */}
        <p className="text-sm text-secondary text-center mb-2 font-accent my-6">
          Drag the slider to select your mood of the day.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center px-8 py-4 md:px-12 md:py-6 relative z-10">
        <button className="px-4 md:px-6 py-2 cursor-pointer border-2 border-primary text-primary rounded-full font-medium hover:bg-primary/10 transition-colors font-accent text-sm md:text-base">
          Previous
        </button>

        <button
          onClick={saveMood}
          className="px-4 md:px-6 py-2 cursor-pointer bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors font-accent text-sm md:text-base"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MoodTracker;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import logo from "../assets/images/favicon.svg";
import MoodLines from "../components/MoodLines";
import { neutralEmotions } from "../assets/assets";

const MoodNeutral = ({ onBack }) => {
  const navigate = useNavigate();
  const [selectedEmotions, setSelectedEmotions] = useState([]);

  const emotions = neutralEmotions;

  const toggleEmotion = (emotion) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotion)
        ? prev.filter((e) => e !== emotion)
        : [...prev, emotion]
    );
  };

  const handleNext = () => {
    // Save selected emotions to localStorage
    const moodData = {
      emotions: selectedEmotions,
      timestamp: new Date().toISOString(),
    };

    const existingData = JSON.parse(
      localStorage.getItem("moodHistory") || "[]"
    );
    if (existingData.length > 0) {
      existingData[existingData.length - 1] = {
        ...existingData[existingData.length - 1],
        ...moodData,
      };
      localStorage.setItem("moodHistory", JSON.stringify(existingData));
    }

    // Navigate to next step (you can customize this)
    if (onBack) {
      onBack();
    } else {
      navigate("/mood-tracker");
    }
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
            onClick={() => navigate("/")}
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
        <button
          onClick={() => (onBack ? onBack() : navigate("/mood-tracker"))}
          className="w-8 h-8 flex items-center justify-center text-primary hover:bg-primary/10 rounded-full transition-colors cursor-pointer"
        >
          <X size={32} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 md:px-12 pb-4 relative z-10 gap-6">
        {/* Vertical Lines Visual */}
        <MoodLines moodColor="#eab308" />

        {/* Mood Label */}
        <h2 className="text-primary text-5xl font-medium italic mb-1 font-instrument">
          Neutral
        </h2>

        {/* Main Question */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 max-w-lg font-satoshi leading-tight">
          What best describes this feeling?
        </h1>

        {/* Emotion Tags */}
        <div className="grid grid-cols-5 gap-2 md:gap-3 max-w-2xl">
          {emotions.map((emotion) => (
            <button
              key={emotion}
              onClick={() => toggleEmotion(emotion)}
              className={`px-3 py-2 rounded-full text-sm font-satoshi transition-colors ${
                selectedEmotions.includes(emotion)
                  ? "bg-primary text-white"
                  : "bg-primary/20 text-primary hover:bg-primary/30"
              }`}
            >
              {emotion}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center px-8 py-4 md:px-12 md:py-6 relative z-10">
        <button
          onClick={() => (onBack ? onBack() : navigate("/mood-tracker"))}
          className="px-4 md:px-6 py-2 cursor-pointer border-2 border-primary text-primary rounded-full font-medium hover:bg-primary/10 transition-colors font-satoshi text-sm md:text-base"
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          className="px-4 md:px-6 py-2 cursor-pointer bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors font-satoshi text-sm md:text-base"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MoodNeutral;

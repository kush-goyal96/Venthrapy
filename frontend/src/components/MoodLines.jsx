import React from "react";

const MoodLines = ({ moodColor, count = 40 }) => {
  // Generate vertical lines with varying heights
  const generateLines = () => {
    const lines = [];
    for (let i = 0; i < count; i++) {
      const height = Math.random() * 80 + 15; // Random height between 15-95px
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
    <div className="flex items-end justify-center gap-0.5 md:gap-1 mb-4 h-16 md:h-24">
      {generateLines()}
    </div>
  );
};

export default MoodLines;

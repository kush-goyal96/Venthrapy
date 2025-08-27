import React, { useState } from "react";
import lock from "../assets/lock.svg";
import unlock from "../assets/unlock.svg";

export default function LockToggle() {
  const [locked, setLocked] = useState(true);

  return (
    <button
      type="button"
      aria-pressed={!locked}
      onClick={() => setLocked(!locked)}
      className={`relative w-40 h-20 rounded-full overflow-hidden focus:outline-none
        transition-colors duration-300 cursor-pointer
        ${
          locked
            ? "bg-gradient-to-r from-[#0639c4] to-[#cdd9f9] to-99% shadow-[-8px_8px_0px_#4069c6]" // locked: solid blue + shadow
            : "bg-gradient-to-r from-[#cdd9f9] to-[white] to-90% shadow-[-8px_8px_0px_#4069c6]" // unlocked: gradient
        }`}
    >
      {/* Sliding knob with icon */}
      <div
        className={`absolute top-[6px] w-[68px] h-[68px] 
                    rounded-full flex items-center justify-center 
                    transform transition-transform duration-300
                    ${locked ? "translate-x-[80px]" : "translate-x-0"} `}
      >
        {locked ? (
          <img src={unlock} alt="locked" className="w-12 h-12 text-background " />
        ) : (
          <img src={lock} alt="unlocked" className="w-12 h-12 text-primary" />
        )}
      </div>
    </button>
  );
}

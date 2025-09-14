import React, { useEffect, useRef, useState } from "react";
import WhyCard from "../components/WhyCard";
import ellipse from "../assets/images/Ellipse.svg";
import card_img_1 from "../assets/images/card_img_1.svg";
import card_img_2 from "../assets/images/card_img_2.svg";
import card_img_3 from "../assets/images/card_img_3.svg";

const items = [
  {
    img: card_img_1,
    description: "Culturally-Aware, Language-Diverse Therapists",
  },
  { img: card_img_2, description: "Therapy & Daily Support System" },
  { img: card_img_3, description: "Privacy-first, safe space to be yourself" },
];

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [allCardsVisible, setAllCardsVisible] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const lastScrollY = useRef(0);
  const handleScrollRef = useRef(null);

  // Create unlock function
  const unlockScroll = () => {
    console.log("Unlocking scroll");
    setIsActive(false);
    setAllCardsVisible(false);
    setScrollProgress(0);
    document.body.style.overflow = "auto";
    if (handleScrollRef.current) {
      window.addEventListener("scroll", handleScrollRef.current, {
        passive: true,
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if section is in viewport - use more stable detection
      const isInView =
        rect.top <= windowHeight * 1.0 && rect.bottom >= windowHeight * 0.9;

      if (isInView && !isActive) {
        console.log("Section becoming active");
        setIsActive(true);
        lastScrollY.current = window.scrollY;
        // Prevent body scroll when section is active
        document.body.style.overflow = "hidden";
        // Remove scroll listener to prevent further changes
        window.removeEventListener("scroll", handleScroll);
      } else if (!isInView && isActive) {
        console.log("Section becoming inactive");
        unlockScroll();
      }
    };

    // Store handleScroll in ref for use in unlock function
    handleScrollRef.current = handleScroll;

    const handleWheel = (e) => {
      if (isActive && !allCardsVisible) {
        e.preventDefault();
        console.log("Wheel event captured, delta:", e.deltaY);

        // Clear existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        setIsScrolling(true);

        // Update scroll progress based on wheel delta
        const delta = e.deltaY;
        const sensitivity = 0.01; // Increased sensitivity for better response
        setScrollProgress((prev) => {
          const newProgress = prev + delta * sensitivity;
          const clampedProgress = Math.max(0, Math.min(1, newProgress));
          console.log(
            "Scroll progress:",
            prev,
            "->",
            clampedProgress,
            "Delta:",
            delta
          );

          // Check if all cards should be visible
          if (clampedProgress >= 0.75 && !allCardsVisible) {
            console.log("All cards should be visible now");
            setAllCardsVisible(true);
            // Auto-unlock scroll after a short delay when all cards are visible
            setTimeout(() => {
              console.log("Auto-unlocking scroll");
              unlockScroll();
            }, 1000);
          }

          return clampedProgress;
        });

        // Set timeout to stop scrolling state
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isActive) {
        console.log("Manual unlock with Escape key");
        unlockScroll();
      }
    };

    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      // Reset state on cleanup
      setIsActive(false);
      setAllCardsVisible(false);
      setScrollProgress(0);
    };
  }, [isActive, allCardsVisible]);

  // Calculate card positions and animations
  const getCardStyle = (index) => {
    const cardDelay = index * 0.25; // Each card starts 0.25 progress after the previous
    const cardProgress = Math.max(
      0,
      Math.min(1, (scrollProgress - cardDelay) / 0.25) // Each card takes 0.25 progress to animate
    );

    // Cards start from bottom of screen and move to their final position
    const startY = window.innerHeight + 100;
    const endY = index * 20; // Slight offset for stacking effect
    const currentY = startY + (endY - startY) * cardProgress;

    return {
      transform: `translateY(${currentY}px)`,
      opacity: cardProgress,
      transition: isScrolling
        ? "none"
        : "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease-out",
    };
  };

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen w-full bg-white"
      style={{ height: "100vh" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-full flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full">
          {/* Left Column (Title) */}
          <div className="relative select-none">
            <img
              src={ellipse}
              alt="ellipse"
              className="w-[680px] max-w-full opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="font-secondary italic text-primary text-6xl sm:text-7xl">
                Why Choose us?
              </h2>
            </div>
          </div>

          {/* Right Column (Cards) */}
          <div className="relative h-[400px] flex flex-col justify-center">
            <div className="relative h-full">
              {items.map((item, index) => (
                <div
                  key={`card-${index}`}
                  className="absolute left-0 top-0 w-full"
                  style={getCardStyle(index)}
                >
                  <div className="flex justify-center">
                    <WhyCard img={item.img} description={item.description} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      {isActive && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-1 h-16 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="w-full bg-primary rounded-full transition-all duration-300"
                style={{ height: `${scrollProgress * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-500">
              {allCardsVisible
                ? "All cards visible - scroll unlocked!"
                : "Scroll to animate cards"}
            </p>
            <p className="text-xs text-gray-400">
              Progress: {Math.round(scrollProgress * 100)}% | Active:{" "}
              {isActive ? "Yes" : "No"}
            </p>
            {isActive && (
              <button
                onClick={() => {
                  console.log("Manual unlock button clicked");
                  unlockScroll();
                }}
                className="mt-2 px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
              >
                Unlock Scroll (or press Escape)
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WhyChooseUs;

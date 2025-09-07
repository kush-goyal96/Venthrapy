import React, { useEffect, useRef, useState } from "react";
import WhyCard from "../components/WhyCard";
import ellipse from "../assets/images/Ellipse.svg";
import card_img_1 from "../assets/images/card_img_1.svg";
import card_img_2 from "../assets/images/card_img_2.svg";
import card_img_3 from "../assets/images/card_img_3.svg";

const items = [
  { img: card_img_1, description: "Culturally-Aware, Language-Diverse Therapists" },
  { img: card_img_2, description: "Therapy & Daily Support System" },
  { img: card_img_3, description: "Privacy-first, safe space to be yourself" },
];

const PRE_SPACER_VH = 30;
const SENTINEL_VH = 120;
const POST_SPACER_VH = 40;

const WhyChooseUs = () => {
  const sentinelsRef = useRef([]);
  const [progress, setProgress] = useState(items.map(() => 0));
  const [viewportH, setViewportH] = useState(typeof window !== "undefined" ? window.innerHeight : 800);

  useEffect(() => {
    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
    const update = () => {
      const next = sentinelsRef.current.map((el) => {
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        const start = viewportH * 0.80;
        const end = viewportH * 0.10;
        const raw = (start - rect.top) / (start - end);
        return clamp(raw, 0, 1);
      });
      setProgress(next);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };
    const onResize = () => setViewportH(window.innerHeight);

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [viewportH]);

  const totalPinHeight = PRE_SPACER_VH + items.length * SENTINEL_VH + POST_SPACER_VH;

  // CHANGE: This component now returns the sticky container directly.
  return (
    <div style={{ height: `${totalPinHeight}vh` }}>
      <section className="sticky top-0 h-screen max-w-7xl mx-auto px-6 sm:px-10 pt-16 pb-48 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start h-full">
          {/* Left Column (Title) */}
          <div className="relative md:sticky md:top-24 self-start select-none">
            <img src={ellipse} alt="ellipse" className="w-[680px] max-w-full opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="font-instrument italic text-primary text-6xl sm:text-7xl">
                Why Choose us?
              </h2>
            </div>
          </div>
          {/* Right Column (Cards & Sentinels) */}
          <div className="relative">
            <div className="sticky top-0 h-[300px] w-full pt-24">
              <div className="relative h-full w-full">
                {items.map((item, index) => (
                  <div key={`stack-${index}`} className="absolute left-0 top-0 will-change-transform" style={{ zIndex: 10 + index, transform: `translateY(${Math.round((1 - progress[index]) * (viewportH * 0.5) - index * 12)}px)`, opacity: Math.max(0, Math.min(1, progress[index])), transition: "transform 120ms linear, opacity 120ms linear" }}>
                    <WhyCard img={item.img} description={item.description} />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 flex flex-col">
              <div style={{ height: `${PRE_SPACER_VH}vh` }} />
              {items.map((_, index) => (
                <div key={`sent-${index}`} ref={(el) => (sentinelsRef.current[index] = el)} style={{ height: `${SENTINEL_VH}vh` }} />
              ))}
              <div style={{ height: `${POST_SPACER_VH}vh` }} />
            </div>
          </div>
        </div>
      </section>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default WhyChooseUs;
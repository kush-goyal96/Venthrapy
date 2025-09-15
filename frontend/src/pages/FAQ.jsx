import React from "react";
import FAQs from "../components/FAQs";
import Navbar from "../components/Navbar";
import { sections } from "../assets/assets";

const FAQ = () => {
  const [currentTitle, setCurrentTitle] = React.useState(sections[0].title);
  const scrollRoot = React.useRef(null);
  return (
    <div className="min-h-screen bg-main-page">
      <Navbar />
      <div className="flex mt-10 ml-[10%]">
        {/* Left section */}
        <div className="text-primary w-1/2">
          <div className="sticky top-[40%]">
            <h1 className="font-secondary italic font-bold text-7xl">FAQs</h1>
            <h3 className="text-3xl py-4">{currentTitle}</h3>
          </div>
        </div>

        {/* right section */}
        <div
          className="w-2/3 my-6 mr-[10%] max-h-[70vh] overflow-y-auto pr-4"
          ref={scrollRoot}
        >
          <FAQs
            sections={sections}
            onSectionChange={setCurrentTitle}
            scrollRoot={scrollRoot}
            anchorRatio={0.7}
          />
        </div>
      </div>
    </div>
  );
};

export default FAQ;

import React from "react";
import FAQs from "../components/FAQs";
import Navbar from "../components/Navbar";
import {sections} from '../assets/faqs'


const FAQ = () => {
  const [currentTitle, setCurrentTitle] = React.useState(sections[0].title);
  const scrollRoot = React.useRef(null);
  return (
    <div className="">
      <Navbar />
      <div className="flex mt-10 ml-[10%]">
        {/* Left section */}
        <div className="text-primary w-1/2">
          <div className="sticky top-[40%]">
            <h1 className="font-instrument italic font-bold text-7xl">FAQs</h1>
            <h3 className="font-inter-tight text-3xl py-4">{currentTitle}</h3>
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
            anchorRatio={0.70}
          />
        </div>
      </div>
    </div>
  );
};  

export default FAQ;

import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronDown } from "lucide-react";

export function FAQs({
  sections,
  onSectionChange,
  scrollRoot,
  anchorRatio = 0.25,
}) {
  const [open, setOpen] = React.useState("0-0");
  const handleOpen = (key) => setOpen((prev) => (prev === key ? "" : key));

  const sectionRefs = React.useRef([]);

  React.useEffect(() => {
    if (!sections || sections.length === 0) return;
    const container = scrollRoot?.current || window;

    const computeActive = () => {
      const el = scrollRoot?.current;
      const containerTop = el ? el.getBoundingClientRect().top : 0;
      const containerHeight = el ? el.clientHeight : window.innerHeight;
      const ratio = Math.min(Math.max(anchorRatio, 0), 1);
      const anchor = containerTop + containerHeight * ratio; // configurable anchor point

      let bestIdx = 0;

      // If scrolled to the very bottom, force last section
      if (el && el.scrollTop + el.clientHeight >= el.scrollHeight - 2) {
        bestIdx = sections.length - 1;
      } else {
        // Choose the last section whose top is above the anchor
        const candidates = sectionRefs.current
          .map((node, idx) => ({ idx, node }))
          .filter(({ node }) => !!node)
          .filter(({ node }) => node.getBoundingClientRect().top <= anchor)
          .map(({ idx }) => idx);
        if (candidates.length > 0) {
          bestIdx = Math.max(...candidates);
        } else {
          bestIdx = 0;
        }
      }
      if (onSectionChange) {
        onSectionChange(sections[bestIdx]?.title || "");
      }
    };

    computeActive();
    container.addEventListener("scroll", computeActive, { passive: true });
    window.addEventListener("resize", computeActive);
    return () => {
      container.removeEventListener("scroll", computeActive);
      window.removeEventListener("resize", computeActive);
    };
  }, [sections, onSectionChange, scrollRoot, anchorRatio]);

  return (
    <div className="mx-10">
      {(sections && sections.length ? sections : []).map(
        (section, sectionIdx) => (
          <div
            key={sectionIdx}
            data-index={sectionIdx}
            ref={(el) => (sectionRefs.current[sectionIdx] = el)}
            className={`${sectionIdx > 0 ? "mt-10" : ""}`}
          >
            {section.items.map((item, idx) => {
              const key = `${sectionIdx}-${idx}`;
              return (
                <Accordion
                  key={key}
                  open={open === key}
                  className="mb-5 rounded-2xl border border-primary shadow-sm px-0 bg-[#EFF0F2]"
                >
                  <AccordionHeader
                    onClick={() => handleOpen(key)}
                    className="border-b-0 px-6 py-5 text-lg font-inter-tight font-medium text-gray-900"
                  >
                    <div className="flex w-full items-center justify-between">
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`h-5 w-5 text-primary transition-transform duration-200 ${
                          open === key ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </div>
                  </AccordionHeader>
                  <AccordionBody className="whitespace-pre-line pt-0 px-6 pb-6 text-gray-700 leading-relaxed font-inter-tight">
                    {item.a}
                  </AccordionBody>
                </Accordion>
              );
            })}
          </div>
        )
      )}
    </div>
  );
}

export default FAQs;

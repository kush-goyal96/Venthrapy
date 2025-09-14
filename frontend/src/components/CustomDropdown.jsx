import React, { useState, useRef, useEffect } from "react";

const CustomDropdown = ({
  options,
  placeholder,
  value,
  onChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-background text-primary appearance-none border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-primary focus:border-transparent w-full cursor-pointer hover:border-primary/50 transition-colors duration-200 text-left flex items-center justify-between"
      >
        <span className="text-primary">{displayText}</span>
        <svg
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 w-full text-primary origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition transition-discrete z-50 border border-gray-200">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleOptionClick(option.value)}
                className={`block w-full px-4 py-2 text-left text-sm text-primary transition-colors duration-150 ${
                  value === option.value
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;

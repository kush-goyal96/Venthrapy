import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TherapistCard from "../components/TherapistCard";
import CustomDropdown from "../components/CustomDropdown";
import { therapists, languages, specializations } from "../assets/assets";

const ChooseTherapist = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");

  // Filter therapists based on search and filter criteria
  const filteredTherapists = therapists.filter((therapist) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.specializations.some((spec) =>
        spec.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Language filter
    const matchesLanguage =
      selectedLanguage === "" || therapist.languages.includes(selectedLanguage);

    // Specialization filter
    const matchesSpecialization =
      selectedSpecialization === "" ||
      therapist.specializations.includes(selectedSpecialization);

    return matchesSearch && matchesLanguage && matchesSpecialization;
  });

  // Transform data for custom dropdowns
  const languageOptions = languages.map((lang) => ({
    value: lang,
    label: lang,
  }));

  const specializationOptions = specializations.map((spec) => ({
    value: spec,
    label: spec,
  }));

  const handleTherapistClick = (therapistId) => {
    return () => {
      navigate(`/therapist/${therapistId}`);
    };
  };

  return (
    <div className="relative min-h-screen bg-main-page overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[65%] -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[1400px] max-h-[1400px] bg-gradient-to-b from-[#2F91F2] from-5% via-[#25EBF5] via-20% to-transparent to-35% rounded-full blur-3xl z-0 opacity-95"
      />
      <Navbar />

      {/* Hero Section */}
      <div className="text-center py-16 px-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-secondary font-semibold italic text-primary mb-6 leading-none">
          Let's find you a therapist
        </h1>
        <p className="text-3xl md:text-5xl text-primary font-medium leading-none">
          where you are
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-3xl mx-auto px-4 mb-12">
        <div className="rounded-2xl shadow-lg p-6 flex flex-col lg:flex-row gap-6 items-center">
          {/* Search Bar */}
          <div className="flex-1 relative w-full bg-background rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or specialisation"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-primary placeholder-primary"
            />
          </div>

          {/* Language Filter */}
          <CustomDropdown
            options={languageOptions}
            placeholder="Languages"
            value={selectedLanguage}
            onChange={setSelectedLanguage}
            className="w-full lg:w-auto lg:min-w-fit"
          />

          {/* Specialization Filter */}
          <CustomDropdown
            options={specializationOptions}
            placeholder="Specialisations"
            value={selectedSpecialization}
            onChange={setSelectedSpecialization}
            className="w-full lg:w-auto lg:min-w-fit"
          />
        </div>
      </div>

      {/* Therapist Cards Grid */}
      <div className="relative max-w-5xl mx-auto px-4 pb-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center auto-cols-fr">
          {filteredTherapists.map((therapist) => (
            <TherapistCard
              key={therapist.id}
              therapist={therapist}
              onClick={handleTherapistClick(therapist.id)}
            />
          ))}
        </div>

        {/* No results message */}
        {filteredTherapists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-secondary">
              No therapists found matching your criteria. Try adjusting your
              search or filters.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ChooseTherapist;

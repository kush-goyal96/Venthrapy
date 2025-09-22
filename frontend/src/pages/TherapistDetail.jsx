import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoArrowBack, IoCheckmarkCircle, IoLanguage } from "react-icons/io5";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { fetchTherapistById } from "../lib/api";
import toast from "react-hot-toast";

const TherapistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const queryClient = useQueryClient();
  const initialFromList = () => {
    const list = queryClient.getQueryData(["therapists"]) || [];
    return list.find((t) => String(t.id) === String(id));
  };

  const { data: therapist, isError } = useQuery({
    queryKey: ["therapist", id],
    queryFn: () => fetchTherapistById(id),
    initialData: initialFromList,
    retry: 1,
  });

  if (isError) {
    toast.error("Failed to load therapist");
  }

  if (!therapist) {
    return (
      <div className="min-h-screen bg-main-page flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-primary mb-4">
            Therapist not found
          </h1>
          <button
            onClick={() => navigate("/choose-therapist")}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Back to Therapists
          </button>
        </div>
      </div>
    );
  }

  const handleBookSession = () => {
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the booking logic
    alert(
      `Session booked with ${therapist.name} for ${selectedDate} at ${selectedTime}`
    );
    setShowBookingModal(false);
  };

  return (
    <div className="relative min-h-screen bg-main-page overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[65%] -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[1400px] max-h-[1400px] bg-gradient-to-b from-[#2F91F2] from-5% via-[#25EBF5] via-20% to-transparent to-35% rounded-full blur-3xl z-0 opacity-95"
      />
      <Navbar />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/choose-therapist")}
          className="flex items-center text-primary hover:text-primary/80 transition-colors mb-6 cursor-pointer"
        >
          <IoArrowBack className="w-5 h-5 mr-2" />
          Back to Therapists
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                {therapist.image ? (
                  <img
                    src={therapist.image}
                    alt={therapist.name}
                    className="w-48 h-48 rounded-2xl object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-48 h-48 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-semibold text-4xl">
                      {therapist.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-grow">
                <h1 className="text-4xl font-secondary font-semibold text-primary mb-2">
                  {therapist.name}
                </h1>
                <p className="text-xl text-secondary mb-4">{therapist.title}</p>
                <p className="text-lg text-secondary mb-6">{therapist.bio}</p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white/80 rounded-xl p-4 text-center">
                    <p className="text-sm text-secondary">Experience</p>
                    <p className="text-lg font-semibold text-primary">
                      {therapist.experience}
                    </p>
                  </div>
                  <div className="bg-white/80 rounded-xl p-4 text-center">
                    <p className="text-sm text-secondary">Session Cost</p>
                    <p className="text-lg font-semibold text-primary">
                      {therapist.sessionCost}
                    </p>
                  </div>
                  <div className="bg-white/80 rounded-xl p-4 text-center">
                    <p className="text-sm text-secondary">Duration</p>
                    <p className="text-lg font-semibold text-primary">
                      {therapist.sessionDuration}
                    </p>
                  </div>
                  <div className="bg-white/80 rounded-xl p-4 text-center">
                    <p className="text-sm text-secondary">Type</p>
                    <p className="text-lg font-semibold text-primary">
                      {therapist.therapyType}
                    </p>
                  </div>
                </div>

                {/* Languages */}
                <div className="flex items-center mb-6">
                  <IoLanguage className="w-5 h-5 mr-2 text-primary" />
                  <span className="text-secondary mr-2">Languages:</span>
                  <span className="text-primary font-medium">
                    {therapist.languages.join(", ")}
                  </span>
                </div>

                {/* Book Session Button */}
                <button
                  onClick={handleBookSession}
                  className="bg-primary cursor-pointer text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg"
                >
                  Book a Session
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Specializations */}
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-4">
                    Specializations
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {therapist.specializations.map((spec, index) => (
                      <span
                        key={index}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Areas of Expertise */}
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-4">
                    Areas of Expertise
                  </h3>
                  <ul className="space-y-2">
                    {therapist.areasOfExpertise.map((area, index) => (
                      <li key={index} className="flex items-center">
                        <IoCheckmarkCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        <span className="text-secondary">{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Approach */}
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-4">
                    Therapeutic Approach
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    {therapist.approach}
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Education */}
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-4">
                    Education & Certifications
                  </h3>
                  <p className="text-secondary leading-relaxed mb-4">
                    {therapist.education}
                  </p>
                  <div className="space-y-2">
                    {therapist.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center">
                        <IoCheckmarkCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        <span className="text-secondary">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-4">
                    Availability
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    {therapist.availability}
                  </p>
                </div>

                {/* Age Groups */}
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-4">
                    Age Groups
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {therapist.ageGroups.map((age, index) => (
                      <span
                        key={index}
                        className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {age}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modalities */}
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-4">
                    Session Modalities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {therapist.modalities.map((modality, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {modality}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-semibold text-primary mb-4">
              Book a Session with {therapist.name}
            </h3>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Select Time
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Choose a time</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                  <option value="6:00 PM">6:00 PM</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-secondary hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Book Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default TherapistDetail;

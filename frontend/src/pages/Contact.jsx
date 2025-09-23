import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaInstagram,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const baseUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      const response = await axios.post(`${baseUrl}/api/contact`, formData);

      if (response.data.success) {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative text-primary font-primary w-full bg-main-page flex flex-col overflow-hidden min-h-screen">
      <Navbar isFixed />

      {/* Main Content */}
      <div className="relative z-10 pt-24 md:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="font-secondary text-primary font-semibold text-center text-5xl italic">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-secondary mt-8 max-w-2xl mx-auto leading-relaxed">
              Ready to start your mental health journey? We're here to listen,
              support, and guide you every step of the way.
            </p>
          </div>

          {/* Contact Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="font-secondary italic text-3xl md:text-4xl text-primary mb-6">
                  Let's Connect
                </h3>
                <p className="text-lg text-secondary leading-relaxed mb-8">
                  Whether you're looking for therapy services, have questions
                  about our approach, or want to learn more about mental health
                  resources, we're here to help.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FaEnvelope className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-primary mb-1">
                      Email
                    </h4>
                    <p className="text-secondary">hello@venthrapy.in</p>
                    <p className="text-secondary">support@venthrapy.in</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FaPhone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-primary mb-1">
                      Phone
                    </h4>
                    <p className="text-secondary">+91 98765 43210</p>
                    <p className="text-sm text-secondary">
                      Mon-Fri 9AM-6PM IST
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FaMapMarkerAlt className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-primary mb-1">
                      Office
                    </h4>
                    <p className="text-secondary">123 Wellness Avenue</p>
                    <p className="text-secondary">Bandra West</p>
                    <p className="text-secondary">Mumbai, Maharashtra 400050</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4">
                <h4 className="font-semibold text-lg text-primary mb-4">
                  Follow Us
                </h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <FaInstagram className="w-5 h-5 text-primary" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <FaLinkedin className="w-5 h-5 text-primary" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <FaFacebook className="w-5 h-5 text-primary" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-background/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-lg border border-primary/10">
              <h3 className="font-secondary italic text-3xl md:text-4xl text-primary mb-6">
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-secondary mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors bg-white/50 backdrop-blur-sm text-secondary placeholder-gray-700"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-secondary mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors bg-white/50 backdrop-blur-sm text-secondary placeholder-gray-700"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-secondary mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors bg-white/50 backdrop-blur-sm text-secondary placeholder-gray-700"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-secondary mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors bg-white/50 backdrop-blur-sm text-secondary placeholder-gray-700 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold tracking-tight transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>

              <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
                <p className="text-sm text-secondary text-center">
                  <strong>Response Time:</strong> We typically respond within 24
                  hours during business days.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-20 text-center">
            <div className="bg-transparent backdrop-blur-sm rounded-3xl p-8 md:p-12">
              <h3 className="font-secondary italic text-3xl md:text-4xl text-primary mb-6">
                Emergency Support
              </h3>
              <p className="text-lg text-secondary mb-6 max-w-3xl mx-auto">
                If you're experiencing a mental health crisis or having thoughts
                of self-harm, please reach out to emergency services
                immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                  Call 9152987821 (KIRAN Mental Health Helpline)
                </a>
                <a className="cursor-pointer bg-primary hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                  Call 100 (Police Emergency)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;

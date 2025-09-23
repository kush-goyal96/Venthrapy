import React, { useState, useEffect } from "react";
import logo from "../assets/images/logo.svg";
import { useNavigate, NavLink } from "react-router-dom";
import { getCurrentUser, logout } from "../lib/api.js";
import toast from "react-hot-toast";

const Navbar = ({ isFixed = false }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { user } = await getCurrentUser();
        setUser(user);
      } catch (err) {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest(".user-dropdown")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setShowDropdown(false);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      toast.error("Failed to logout");
    }
  };

  return (
    <nav
      className={`w-full px-6 py-4 border-gray-100 z-20 ${
        isFixed ? "fixed top-0 left-0 right-0 bg-transparent mt-2" : "pt-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img
            onClick={() => {
              navigate("/");
            }}
            src={logo}
            alt="Venthrapy Logo"
            className=" cursor-pointer"
          />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 font-accent bg-background px-8 py-2 rounded-3xl text-primary font-medium text-lg border-transparent shadow-[inset_0_1.5px_1px_rgba(0,0,0,0.20)] opacity-95">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-primary transition-colors duration-200 tracking-tight relative ${
                isActive
                  ? "after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                  : ""
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `hover:text-primary transition-colors duration-200 tracking-tight relative ${
                isActive
                  ? "after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                  : ""
              }`
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              `hover:text-primary transition-colors duration-200 tracking-tight relative ${
                isActive
                  ? "after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                  : ""
              }`
            }
          >
            Blogs
          </NavLink>
          <NavLink
            to="/meditation"
            className={({ isActive }) =>
              `hover:text-primary transition-colors duration-200 tracking-tight relative ${
                isActive
                  ? "after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                  : ""
              }`
            }
          >
            Meditation Library
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hover:text-primary transition-colors duration-200 tracking-tight relative ${
                isActive
                  ? "after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                  : ""
              }`
            }
          >
            Contact
          </NavLink>
        </div>

        {/* User Profile or Sign up / Log-In Button */}
        <div className="flex items-center">
          {user ? (
            <div className="relative user-dropdown">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 bg-white hover:bg-gray-50 px-4 py-2 rounded-full border border-gray-200 transition-colors duration-100"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium text-heading">
                  {user.name}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    showDropdown ? "rotate-180" : ""
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
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate("/mood-tracker");
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Mood Tracker
                  </button>
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Dashboard
                  </button>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-primary hover:bg-blue-800 text-white px-6 py-3 rounded-full transition-colors duration-100 tracking-tight cursor-pointer"
            >
              Sign up | Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="bg-primary hover:text-primary">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (hidden by default) */}
      <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4 hidden">
        <div className="flex flex-col space-y-3">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-primary transition-colors duration-200 tracking-tight relative ${
                isActive
                  ? "after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                  : ""
              }`
            }
          >
            about
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `hover:text-primary transition-colors duration-200 tracking-tight relative ${
                isActive
                  ? "after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                  : ""
              }`
            }
          >
            services
          </NavLink>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              `hover:text-primary transition-colors duration-200 tracking-tight relative ${
                isActive
                  ? "after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                  : ""
              }`
            }
          >
            blogs
          </NavLink>
          <NavLink
            to="/meditation"
            className={({ isActive }) =>
              `hover:text-primary transition-colors duration-200 tracking-tight relative ${
                isActive
                  ? "after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                  : ""
              }`
            }
          >
            Meditation Library
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hover:text-primary transition-colors duration-200 tracking-tight relative ${
                isActive
                  ? "after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                  : ""
              }`
            }
          >
            contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

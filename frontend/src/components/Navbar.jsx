import React from "react";
import logo from "../assets/images/logo.svg";
import { useNavigate, NavLink } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full px-6 py-4 border-gray-100 mt-5 z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img
            onClick={() => {
              navigate("/");
            }}
            src={logo}
            alt="Ventthrapy Logo"
            className=" cursor-pointer"
          />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 font-satoshi bg-background px-8 py-2 rounded-3xl text-primary font-medium text-lg border-transparent shadow-[inset_0_0.5px_1px_rgba(0,0,0,0.10)] opacity-95">
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
            Resources
          </NavLink>
          <NavLink
            to="/tapes"
            className={({ isActive }) =>
              `hover:text-primary transition-colors duration-200 tracking-tight relative ${
                isActive
                  ? "after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                  : ""
              }`
            }
          >
            Tapes
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

        {/* Sign up / Log-In Button */}
        <div className="flex items-center">
          <button className="bg-primary hover:bg-blue-800 text-white px-6 py-3 rounded-full transition-colors duration-100 tracking-tight cursor-pointer">
            Sign up | Login
          </button>
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
            to="/tapes"
            className={({ isActive }) =>
              `hover:text-primary transition-colors duration-200 tracking-tight relative ${
                isActive
                  ? "after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                  : ""
              }`
            }
          >
            tapes
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

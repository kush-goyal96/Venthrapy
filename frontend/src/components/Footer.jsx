import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import footer_img from "../assets/footer_img.svg";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="realtive">
      {/* first part */}
      <div className="flex bg-primary items-center overflow-hidden ">
        <div className="w-1/2 pr-6 pl-12 md:pl-24">
          <h1 className="font-instrument italic text-left text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-background">
            Ready to start your <br /> journey?
          </h1>
        </div>
        <div className="flex-1 flex items-center justify-end">
          <div className="relative">
            <img
              className="w-[520px] md:w-[640px] object-contain"
              src={footer_img}
              alt=""
            />
            <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ml-6 md:ml-28 rounded-3xl px-6 py-2 font-semibold tracking-tight bg-background text-primary shadow-lg border-3 border-transparent">
              Book a session
            </button>
          </div>
        </div>
      </div>

      {/* second part */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm mx-8">
        {/* Left Section */}
        <div className="mx-24">
          <img className="mb-5 w-40" src={logo} alt="" />
          <p className="w-full text-primary leading-6">
            True well-being isn't in a one-hour session, it's in the small,
            daily actions we take, the stories we hear, and the spaces we belong
            to. True well-being isn't in a one-hour session, it's in the small,
            daily actions we take, the stories we hear, and the spaces we belong
            to. True well-being isn't in a one-hour session, it's in the small,
            daily actions we take, the stories we hear, and the spaces we belong
            to.
          </p>
        </div>
        {/* Center Section */}
        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-2 text-primary">
            <li className="cursor-pointer w-fit" onClick={() => navigate("/")}>
              Home
            </li>
            <li
              className="cursor-pointer w-fit"
              onClick={() => navigate("/about")}
            >
              About
            </li>
            <li className="cursor-pointer w-fit" onClick={() => navigate("/")}>
              Services
            </li>
            <li
              className="cursor-pointer w-fit"
              onClick={() => navigate("/contact")}
            >
              Resources
            </li>
            <li className="cursor-pointer w-fit" onClick={() => navigate("/")}>
              Meditation Library
            </li>
            <li className="cursor-pointer w-fit" onClick={() => navigate("/")}>
              Contact Us
            </li>
          </ul>
        </div>
        {/* Right Section */}
        <div>
          <p className="text-xl font-medium mb-5">Socials</p>
          <ul className="flex flex-col gap-2 text-primary">
            <li className="">Instagram</li>

            <li className="">Linkedin</li>
            <li className="">Twitter</li>
          </ul>
        </div>
      </div>
      <div>
        {/* Copyright Text */}
        <div>
          <hr />
          <div className="flex gap-10 items-center justify-center bg-primary text-background">
            <p className="py-5 text-sm text-center">
              Copyright 2025@ Venthrapy - All Rights Reserved.
            </p>
            <p className="py-5 text-sm text-center">Terms and Conditions.</p>
            <p className="py-5 text-sm text-center">Privacy Policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

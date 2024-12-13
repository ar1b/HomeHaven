import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/hhlogo.png";
import WhiteLogo from "../assets/hhlogowhite.jpg";
import WhiteTransParent from "../assets/hhlogowhitetrans.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white">

       <div className="py-8 px-4 sm:px-8 lg:px-16 border-b border-gray-700">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex flex-col items-center sm:items-start">
            <img src={WhiteTransParent} alt="HomeHaven Logo" className="h-20 object-contain"/>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-bold mb-4">Main Pages</h3>
            <Link to="/" className="text-gray-400 hover:text-yellow-500">Home</Link>
            <Link to="/listingsearch" className="text-gray-400 hover:text-yellow-500">Listings</Link>
            <Link to="/userupdate" className="text-gray-400 hover:text-yellow-500">Profile</Link>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-bold mb-4">Get Started</h3>
            <Link to="/signup" className="text-gray-400 hover:text-yellow-500">Sign Up</Link>
            <Link to="/signin" className="text-gray-400 hover:text-yellow-500">Sign In</Link>
          </div>
        </div>
      </div>

      <div className="py-4 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left space-y-2 sm:space-y-0">
          <p className="text-gray-400 ml-3">Your trusted real estate partner.</p>
          <p className="text-gray-400">© 2024 HomeHaven. All rights reserved.</p>
          <p className="text-gray-400">
            Designed and Built by{" "}
            <a
              href="https://github.com/ar1b/HomeHaven"
              className="text-yellow-500 hover:underline"
            >
              HomeHaven
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

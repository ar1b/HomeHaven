import React from "react";
import BrutalistBuilding from "../assets/brutalismBuilding.jpg";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E0E0E0] px-4 relative">

      <div className="flex bg-purple-500 w-full max-w-8xl h-[75vh] rounded-lg shadow-lg -translate-y-20 mt-12">

        <div className="flex flex-col justify-center items-start w-full px-20">
          <h2 className="text-white text-8xl font-bold uppercase mb-4">DISCOVER</h2>
          <h2 className="text-yellow-400 text-8xl font-bold uppercase mb-4">YOUR IDEAL</h2>
          <h2 className="text-white text-8xl font-bold uppercase mb-4">PROPERTY</h2>
        </div>

        <div className="flex justify-end items-end w-full">
          <img src={BrutalistBuilding} className="max-w-full h-full object-cover" alt="Brutalist Building" />
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-10 bg-white rounded-full shadow-md max-w-full mx-4">
        <p className="text-gray-700">Check out our Listings <span className="text-purple-900 font-semibold">Here</span></p>
      </div>
    </div>
  );
};

export default Home;


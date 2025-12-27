import React from "react";
import myLogo from "../assets/imgi_1_logo-BfNap0Pe.png";
export default function Sidebar() {
  return <>
    <div className="w-45 bg-white py-5 border-r border-gray-200 shrink-0 sticky top-0 h-screen">
       <div className="px-4 mb-8">
        <img
          src={myLogo}
          alt="Logo"
          className="w-full h-auto rounded-xl object-cover"
        />
      </div>
      <div className="px-4 space-y-3">
        <button className="
          w-full bg-linear-to-r from-orange-400 to-orange-300
          text-white py-2 px-5 rounded-full font-semibold text-sm
          flex items-center gap-2 shadow-md hover:scale-[1.02] 
          transition-all duration-300
        ">
          <span>🍽️</span>
          Meals
        </button>
        <button className="
          w-full bg-white text-gray-700 py-2 px-5 rounded-full text-sm font-medium
          border border-gray-300 flex items-center gap-2
          transition-all duration-300
          hover:bg-orange-50 hover:border-orange-400
        ">
          <span>🥘</span>
          Ingredients
        </button>

        <button className="
          w-full bg-white text-gray-700 py-2 px-5 rounded-full text-sm font-medium
          border border-gray-300 flex items-center gap-2
          transition-all duration-300
          hover:bg-orange-50 hover:border-orange-400
        ">
          <span>🌍</span>
          Area
        </button>
      </div>
    </div>
  </>;
}

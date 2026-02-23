import React from "react";
import myLogo from "../assets/imgi_1_logo-BfNap0Pe.png";

export default function Sidebar({ currentPage, onNavigate }) {
  const navItems = [
    { label: "Meals", icon: "🍽️", page: "meals" },
    { label: "Ingredients", icon: "🥘", page: "ingredients" },
    { label: "Area", icon: "🌍", page: "area" },
  ];

  return (
    <div className="w-48 bg-[#FAF6F1] py-5 border-r border-amber-200 shrink-0 sticky top-0 h-screen hidden md:flex flex-col">
      <div className="px-4 mb-8">
        <img
          src={myLogo}
          alt="Logo"
          className="w-full h-auto rounded-xl object-cover"
        />
      </div>

      <div className="px-4 space-y-3">
        {navItems.map((item) => (
          <button
            key={item.page}
            onClick={() => onNavigate && onNavigate(item.page)}
            className={`w-full py-2 px-5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-300 ${
              currentPage === item.page
                ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-md hover:scale-[1.02]"
                : "bg-white text-[#3E1F00] border border-amber-200 hover:bg-amber-50 hover:border-amber-400"
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
  import React, { useState } from "react";
  import { ChefHat, Menu, X } from "lucide-react";

  interface NavbarProps {
    currentPage: string;
    onNavigate: (page: string) => void;
  }

  export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = [
      { label: "Meals", icon: "🍽️", page: "meals" },
      { label: "Ingredients", icon: "🥘", page: "ingredients" },
      { label: "Area", icon: "🌍", page: "area" },
    ];

    return (
      <div className="bg-[#3E1F00] shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2.5 rounded-full shadow-md hover:scale-105 transition-transform duration-300">
              <ChefHat className="w-7 h-7 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-amber-300 text-xs font-semibold tracking-widest uppercase">
                Recipe
              </span>
              <span
                className="text-white text-base font-bold hidden sm:block"
                style={{ fontFamily: "Pacifico, cursive" }}
              >
                Learn, Cook, Eat Your Food
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  currentPage === item.page
                    ? "bg-amber-400 text-[#3E1F00] shadow font-bold"
                    : "text-amber-100 hover:bg-[#5C2E00] hover:text-white"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
                {currentPage === item.page && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3E1F00] ml-1"></span>
                )}
              </button>
            ))}
          </nav>

          <button
            className="sm:hidden text-amber-300 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="sm:hidden bg-[#4A2500] px-4 pb-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                  currentPage === item.page
                    ? "bg-amber-400 text-[#3E1F00] font-bold"
                    : "text-amber-100 hover:bg-[#5C2E00]"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
                {currentPage === item.page && (
                  <span className="ml-auto text-xs text-[#3E1F00] font-bold">●</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
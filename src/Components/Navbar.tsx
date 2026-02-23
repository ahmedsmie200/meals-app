import React from "react";
import { ChefHat, Utensils, Carrot, Globe } from "lucide-react";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { label: "Meals", icon: Utensils, page: "meals" },
  { label: "Ingredients", icon: Carrot, page: "ingredients" },
  { label: "Area", icon: Globe, page: "area" },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  return (
    <>
      <div className="hidden sm:block bg-[#3E1F00] shadow-md sticky top-0 z-50">
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
                className="text-white text-base font-bold"
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
                <item.icon className="w-4 h-4" />
                {item.label}
                {currentPage === item.page && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3E1F00] ml-1"></span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#3E1F00] border-t border-amber-800 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`flex flex-col items-center gap-1 px-5 py-1.5 rounded-2xl transition-all duration-200 ${
                currentPage === item.page
                  ? "bg-amber-400 text-[#3E1F00]"
                  : "text-amber-300 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sm:hidden h-16" />
    </>
  );
}
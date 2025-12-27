import React from "react";
import { ChefHat } from "lucide-react";

export default function Navbar() {
  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center gap-4 sm:gap-6">
        <div className="bg-gradient-to-br from-orange-400 to-yellow-500 p-3 rounded-full shadow-md hover:scale-105 transition-transform duration-300">
          <ChefHat className="w-8 h-8 text-white" />
        </div>

        <div className="flex flex-col justify-center space-y-1 sm:space-y-2">
          <h1 className="text-3xl font-bold text-orange-600 tracking-wide">
            Recipe
          </h1>

          <h1
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-500 via-[#ca1023c4] to-[#c90519] bg-clip-text text-transparent transition-transform duration-300 hover:scale-105"
            style={{ fontFamily: "Pacifico700, cursive", fontWeight: 700 }}
          >
            Learn, Cook, Eat Your Food
          </h1>
        </div>
      </div>
    </div>
  );
}

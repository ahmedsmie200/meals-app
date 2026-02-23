import React, { useEffect, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-[#3E1F00] shadow-md w-full">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-3">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-amber-400 p-2.5 rounded-full shadow-md">
              <ChefHat className="w-6 h-6 text-[#3E1F00]" />
            </div>
            <span className="text-amber-300 text-sm font-bold uppercase tracking-widest">
              RECIPE
            </span>
          </div>

          {/* Nav Buttons — desktop only */}
          {!isMobile && (
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    currentPage === item.page
                      ? "bg-amber-400 text-[#3E1F00] shadow-md"
                      : "text-amber-200 hover:text-white"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                  {currentPage === item.page && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3E1F00] ml-0.5" />
                  )}
                </button>
              ))}
            </nav>
          )}
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      {isMobile && (
        <>
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#3E1F00] border-t border-amber-900 shadow-[0_-4px_24px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-around px-4 py-2">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`flex flex-col items-center gap-1 px-6 py-1.5 rounded-2xl transition-all duration-200 ${
                    currentPage === item.page
                      ? "bg-amber-400 text-[#3E1F00]"
                      : "text-amber-400 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-[11px] font-semibold">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Spacer */}
          <div className="h-16" />
        </>
      )}
    </>
  );
}
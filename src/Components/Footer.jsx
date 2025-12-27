import React from 'react';
import logo from '../assets/imgi_1_logo-BfNap0Pe.png';
export default function Footer() {
  return (
    <footer className="bg-[#ffffff] border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-8">
        
        <div className="flex justify-between items-center mb-8">
          
        <div className="flex items-center gap-3">
   <img 
    src={logo} 
    alt="Logo" 
    className="w-10 h-10 object-cover rounded-full" 
     />
     <h3 className="text-2xl font-bold text-gray-800 font-[Pacifico]">Recipe</h3>
    </div>
          <a 
            href="#" 
            className="text-blue-600 font-semibold text-lg hover:text-blue-700 transition-colors font-[Poppins]"
          >
            Route
          </a>
        </div>
        <div className="text-center pt-6 border-t border-gray-300">
          <p className="text-gray-600 text-sm font-[Poppins]">
            © 2025 Ahmed Samir™. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
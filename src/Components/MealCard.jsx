import React from "react";

export default function MealCard({ meal, onMealClick }) {
  return (
    <div className="relative bg-white rounded-2xl cursor-pointer transition-all duration-300 shadow-md hover:-translate-y-1 hover:shadow-xl font-sans group pt-28 mb-20 w-full max-w-xs sm:w-72 border border-amber-100">
      <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full overflow-hidden border-4 border-amber-100 shadow-md transition-transform duration-700 ease-in-out group-hover:rotate-360">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-6 pb-10 text-center">
        <h3 className="font-bold text-xl mb-2 text-[#3E1F00]">{meal.strMeal}</h3>
        <p className="text-sm text-amber-600 mb-4 flex items-center justify-center gap-1 font-medium">
          <span>🌍</span>
          {meal.strArea || "International"}
        </p>
        <button
          aria-label={`View recipe for ${meal.strMeal}`}
          onClick={() => onMealClick(meal.idMeal)}
          className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:from-amber-700 hover:to-amber-600 hover:scale-[1.02] shadow"
        >
          View Recipe
        </button>
      </div>
    </div>
  );
}
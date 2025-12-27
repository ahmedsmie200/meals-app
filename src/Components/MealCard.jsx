import React from "react";

export default function MealCard({ meal, onMealClick }) {
  return (
    <div className="relative bg-white rounded-2xl cursor-pointer transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-2xl font-sans group pt-28 mb-20 w-full max-w-xs sm:w-80">
      <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full overflow-hidden border-4 border-gray-100 shadow-md transition-transform duration-700 ease-in-out group-hover:rotate-360">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="px-8 pb-12 text-center">
        <h3 className="font-bold text-2xl mb-3 text-gray-800">{meal.strMeal}</h3>
        <p className="text-sm text-emerald-500 mb-4 flex items-center justify-center gap-2 font-medium">
          <span>🌍</span>
          {meal.strArea || "International"}
        </p>
        <button
          aria-label={`View recipe for ${meal.strMeal}`}
          onClick={() => onMealClick(meal.idMeal)}
          className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:from-emerald-600 hover:to-emerald-700 hover:scale-[1.02]"
        >
          View Recipe
        </button>
      </div>
    </div>
  );
}

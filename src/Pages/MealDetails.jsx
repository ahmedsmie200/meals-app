import React, { useState, useEffect } from "react";

const API_BASE = "https://www.themealdb.com/api/json/v1/1";

export default function MealDetailsPage({ mealId, onBack }) {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchMealDetails();
  }, [mealId]);

  const fetchMealDetails = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`${API_BASE}/lookup.php?i=${mealId}`);
      const data = await response.json();
      if (data.meals && data.meals.length > 0) setMeal(data.meals[0]);
      else setError(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getIngredients = () => {
    if (!meal) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient?.trim()) ingredients.push({ ingredient, measure });
    }
    return ingredients;
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading meal details...</p>
        </div>
      </div>
    );

  if (error || !meal)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center bg-white p-10 rounded-2xl shadow-lg max-w-md">
          <div className="text-6xl mb-5">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Meal Not Found</h2>
          <p className="text-gray-600 mb-6">The meal ID you're looking for doesn't exist or is invalid.</p>
          <button
            onClick={onBack}
            className="bg-linear-to-r from-orange-400 to-orange-300 text-white py-3 px-10 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );

  const ingredients = getIngredients();

  return (
    <div className="min-h-screen bg-gray-100">
   
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-orange-500 font-semibold text-base hover:text-orange-600 transition-colors"
          >
            <span className="text-xl">←</span> Back to Meals
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div
            className="relative h-96 bg-cover bg-center"
            style={{ backgroundImage: `url(${meal.strMealThumb})` }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
              <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">{meal.strMeal}</h1>
              <div className="flex gap-4 text-sm">
                <span className="bg-white/25 backdrop-blur px-4 py-1 rounded-full font-medium">
                  🌍 {meal.strArea}
                </span>
                <span className="bg-white/25 backdrop-blur px-4 py-1 rounded-full font-medium">
                  🍽️ {meal.strCategory}
                </span>
              </div>
            </div>
          </div>

          <div className="p-10 space-y-10">
            <div className="grid md:grid-cols-2 gap-10">
        
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-3xl">🥘</span> Ingredients
                </h2>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                  <ul className="space-y-2">
                    {ingredients.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-700 text-sm">
                        <span className="w-2.5 h-2.5 bg-orange-400 rounded-full shrink-0"></span>
                        <span className="font-semibold min-w-20">{item.measure}</span>
                        <span>{item.ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-3xl">ℹ️</span> Information
                </h2>
                <div className="flex flex-col gap-4">
                  {meal.strTags && (
                    <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5">
                      <h3 className="font-semibold text-gray-700 mb-3">Tags:</h3>
                      <div className="flex flex-wrap gap-2">
                        {meal.strTags.split(",").map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {meal.strYoutube && (
                    <a
                      href={meal.strYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-red-500 text-white text-center py-3 rounded-xl font-semibold text-sm hover:bg-red-600 hover:scale-105 transition-transform duration-300"
                    >
                      Watch on YouTube 📺
                    </a>
                  )}
                  {meal.strSource && (
                    <a
                      href={meal.strSource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-blue-500 text-white text-center py-3 rounded-xl font-semibold text-sm hover:bg-blue-600 hover:scale-105 transition-transform duration-300"
                    >
                      View Source 🔗
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-3xl">👨‍🍳</span> Instructions
              </h2>
              <div className="bg-linear-to-br from-green-100 to-green-50 border border-green-200 rounded-xl p-8">
                <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">
                  {meal.strInstructions}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

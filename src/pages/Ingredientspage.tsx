import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";

const API_BASE = "https://www.themealdb.com/api/json/v1/1";

interface Ingredient {
  idIngredient: string;
  strIngredient: string;
}

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function IngredientsPage({
  currentPage,
  onNavigate,
  onMealClick,
}: {
  currentPage: string;
  onNavigate: (page: string) => void;
  onMealClick: (mealId: string) => void;
}) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [search, setSearch] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loadingMeals, setLoadingMeals] = useState(false);
  const [loadingIngredients, setLoadingIngredients] = useState(true);

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const res = await fetch(`${API_BASE}/list.php?i=list`);
      const data = await res.json();
      setIngredients(data.meals || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingIngredients(false);
    }
  };

  const fetchMealsByIngredient = async (ingredient: string) => {
    setSelectedIngredient(ingredient);
    setLoadingMeals(true);
    setMeals([]);
    try {
      const res = await fetch(`${API_BASE}/filter.php?i=${encodeURIComponent(ingredient)}`);
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMeals(false);
    }
  };

  const filtered = ingredients.filter((i) =>
    i.strIngredient.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      <div className="flex min-h-screen">
        <Sidebar currentPage={currentPage} onNavigate={onNavigate} />

        <div className="flex-1 p-4 sm:p-8 overflow-x-hidden">
          {/* Header */}
          <div className="mb-6">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#3E1F00] mb-1"
              style={{ fontFamily: "Pacifico, cursive" }}
            >
              🥘 Ingredients
            </h2>
            <p className="text-amber-700 text-sm">
              Browse all ingredients and discover meals made with each one
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6 max-w-md">
            <input
              type="text"
              placeholder="Search ingredient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-3 rounded-full border border-amber-300 bg-white text-[#3E1F00] placeholder-amber-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400">🔍</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-72 flex-shrink-0">
              <h3 className="text-[#3E1F00] font-semibold mb-3 text-sm uppercase tracking-wide">
                All Ingredients ({filtered.length})
              </h3>
              {loadingIngredients ? (
                <div className="flex justify-center py-10">
                  <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="h-[60vh] overflow-y-auto pr-1 space-y-1.5 scrollbar-thin">
                  {filtered.map((ing) => (
                    <button
                      key={ing.idIngredient}
                      onClick={() => fetchMealsByIngredient(ing.strIngredient)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-3 ${
                        selectedIngredient === ing.strIngredient
                          ? "bg-[#3E1F00] text-white shadow"
                          : "bg-white text-[#5C2E00] border border-amber-200 hover:bg-amber-50 hover:border-amber-400"
                      }`}
                    >
                      <img
                        src={`https://www.themealdb.com/images/ingredients/${ing.strIngredient}-Small.png`}
                        alt={ing.strIngredient}
                        className="w-8 h-8 object-contain rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <span>{ing.strIngredient}</span>
                    </button>
                  ))}
                  {filtered.length === 0 && (
                    <p className="text-amber-600 text-sm text-center py-6">No ingredients found</p>
                  )}
                </div>
              )}
            </div>

            <div className="flex-1">
              {!selectedIngredient ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="text-5xl mb-4">🥗</div>
                  <p className="text-amber-700 font-medium">Select an ingredient to see its meals</p>
                  <p className="text-amber-500 text-sm mt-1">
                    {ingredients.length} ingredients available
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-[#3E1F00] font-bold text-lg mb-4 flex items-center gap-2">
                    <img
                      src={`https://www.themealdb.com/images/ingredients/${selectedIngredient}-Small.png`}
                      alt={selectedIngredient}
                      className="w-8 h-8 object-contain"
                    />
                    Meals with <span className="text-amber-600">{selectedIngredient}</span>
                    {!loadingMeals && (
                      <span className="text-sm font-normal text-amber-500 ml-1">
                        ({meals.length} meals)
                      </span>
                    )}
                  </h3>

                  {loadingMeals ? (
                    <div className="flex justify-center py-16">
                      <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : meals.length === 0 ? (
                    <p className="text-amber-600 text-center py-10">No meals found for this ingredient</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {meals.map((meal) => (
                        <div
                          key={meal.idMeal}
                          onClick={() => onMealClick(meal.idMeal)}
                          className="bg-white rounded-2xl overflow-hidden border border-amber-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
                        >
                          <div className="overflow-hidden">
                            <img
                              src={meal.strMealThumb}
                              alt={meal.strMeal}
                              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-3">
                            <p className="text-[#3E1F00] font-semibold text-xs leading-tight line-clamp-2">
                              {meal.strMeal}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../Components/Sidebar";
import MealCard from "../Components/MealCard";

const API_BASE = "https://www.themealdb.com/api/json/v1/1";

export default function HomePage({ onMealClick, currentPage, onNavigate }) {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const fetchController = useRef(null);

  useEffect(() => {
    fetchCategories();
    fetchMeals();
    return () => {
      if (fetchController.current) fetchController.current.abort();
    };
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/categories.php`);
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchMeals = async (category = "") => {
    setLoading(true);
    if (fetchController.current) fetchController.current.abort();
    fetchController.current = new AbortController();
    const signal = fetchController.current.signal;

    try {
      let url = `${API_BASE}/search.php?s=`;
      if (category && category !== "All") url = `${API_BASE}/filter.php?c=${category}`;
      const res = await fetch(url, { signal });
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (e) {
      if (e.name !== "AbortError") { console.error(e); setMeals([]); }
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchMeals(category === "All" ? "" : category);
  };

  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      <div className="flex min-h-screen">
        <Sidebar currentPage={currentPage} onNavigate={onNavigate} />

        <div className="flex-1 p-4 sm:p-8 overflow-x-hidden">
          <div className="mb-6">
            <h2
              className="text-2xl sm:text-4xl font-bold text-[#3E1F00] mb-1"
              style={{ fontFamily: "Pacifico, cursive" }}
            >
              Learn, Cook, Eat Your Food
            </h2>
            <p className="text-amber-700 text-sm sm:text-base">
              Discover delicious recipes from around the world
            </p>

            <div className="flex flex-wrap gap-2 mt-5 border-b border-amber-200 pb-4 mb-6">
              <button
                onClick={() => handleCategoryClick("All")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  selectedCategory === "All"
                    ? "bg-[#3E1F00] text-white border-[#3E1F00]"
                    : "bg-white text-[#5C2E00] border-amber-300 hover:bg-amber-50"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.idCategory}
                  onClick={() => handleCategoryClick(cat.strCategory)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    selectedCategory === cat.strCategory
                      ? "bg-[#3E1F00] text-white border-[#3E1F00]"
                      : "bg-white text-[#5C2E00] border-amber-300 hover:bg-amber-50"
                  }`}
                >
                  {cat.strCategory}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-amber-800">Loading meals...</p>
            </div>
          ) : meals.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-amber-700 text-lg">No meals found</p>
            </div>
          ) : (
            <div className="mt-10 grid gap-y-16 gap-x-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
              {meals.map((meal) => (
                <MealCard key={meal.idMeal} meal={meal} onMealClick={onMealClick} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
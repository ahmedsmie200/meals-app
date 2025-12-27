import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../Components/Sidebar";
import MealCard from "../Components/MealCard";

const API_BASE = "https://www.themealdb.com/api/json/v1/1";

export default function HomePage({ onMealClick }) {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true)
  const fetchController = useRef(null);

  useEffect(() => {
    fetchCategories();
    fetchMeals();
   
    return () => {
      if (fetchController.current) {
        fetchController.current.abort();
      }
    };
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE}/categories.php`);
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchMeals = async (category = "") => {
    setLoading(true);

    if (fetchController.current) {
      fetchController.current.abort();
    }
    fetchController.current = new AbortController();
    const signal = fetchController.current.signal;

    try {
      let url = `${API_BASE}/search.php?s=`;
      if (category && category !== "All") {
        url = `${API_BASE}/filter.php?c=${category}`;
      }
      const response = await fetch(url, { signal });
      const data = await response.json();
      setMeals(data.meals || []);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error fetching meals:", error);
        setMeals([]);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchMeals(category === "All" ? "" : category);
  };
  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex-1 p-8">
          
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-orange-500 mb-2 font-[Pacifico]">
              Learn, Cook, Eat Your Food
            </h2>

           
            <div className="flex flex-wrap gap-2 mt-5 border-b border-gray-200 pb-4 mb-6">
              <button
                onClick={() => handleCategoryClick("All")}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                  selectedCategory === "All"
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.idCategory}
                  onClick={() => handleCategoryClick(cat.strCategory)}
                  className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                    selectedCategory === cat.strCategory
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {cat.strCategory}
                </button>
              ))}
            </div>
          </div>
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-7 text-gray-600">Loading meals...</p>
            </div>
          ) : meals.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">No meals found</p>
            </div>
          ) : (
            <div className="mt-10 grid gap-y-12 gap-x-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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

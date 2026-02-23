import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";

const API_BASE = "https://www.themealdb.com/api/json/v1/1";

// Map area names to flag emojis
const areaFlags = {
  American: "🇺🇸", British: "🇬🇧", Canadian: "🇨🇦", Chinese: "🇨🇳",
  Croatian: "🇭🇷", Dutch: "🇳🇱", Egyptian: "🇪🇬", Filipino: "🇵🇭",
  French: "🇫🇷", Greek: "🇬🇷", Indian: "🇮🇳", Irish: "🇮🇪",
  Italian: "🇮🇹", Jamaican: "🇯🇲", Japanese: "🇯🇵", Kenyan: "🇰🇪",
  Malaysian: "🇲🇾", Mexican: "🇲🇽", Moroccan: "🇲🇦", Polish: "🇵🇱",
  Portuguese: "🇵🇹", Russian: "🇷🇺", Spanish: "🇪🇸", Thai: "🇹🇭",
  Tunisian: "🇹🇳", Turkish: "🇹🇷", Ukrainian: "🇺🇦", Uruguayan: "🇺🇾",
  Vietnamese: "🇻🇳", Unknown: "🌍",
};

export default function AreaPage({ currentPage, onNavigate, onMealClick }) {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [meals, setMeals] = useState([]);
  const [mealCounts, setMealCounts] = useState({});
  const [loadingAreas, setLoadingAreas] = useState(true);
  const [loadingMeals, setLoadingMeals] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    try {
      const res = await fetch(`${API_BASE}/list.php?a=list`);
      const data = await res.json();
      const areaList = data.meals || [];
      setAreas(areaList);
      // Fetch meal counts for each area
      fetchMealCounts(areaList);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAreas(false);
    }
  };

  const fetchMealCounts = async (areaList) => {
    const counts = {};
    await Promise.all(
      areaList.map(async (a) => {
        try {
          const res = await fetch(`${API_BASE}/filter.php?a=${encodeURIComponent(a.strArea)}`);
          const data = await res.json();
          counts[a.strArea] = data.meals ? data.meals.length : 0;
        } catch {
          counts[a.strArea] = 0;
        }
      })
    );
    setMealCounts(counts);
  };

  const fetchMealsByArea = async (area) => {
    setSelectedArea(area);
    setLoadingMeals(true);
    setMeals([]);
    try {
      const res = await fetch(`${API_BASE}/filter.php?a=${encodeURIComponent(area)}`);
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMeals(false);
    }
  };

  const filteredAreas = areas.filter((a) =>
    a.strArea.toLowerCase().includes(search.toLowerCase())
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
              🌍 World Cuisines
            </h2>
            <p className="text-amber-700 text-sm">
              Explore recipes from {areas.length} cuisines around the globe
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-6 max-w-md">
            <input
              type="text"
              placeholder="Search cuisine..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-3 rounded-full border border-amber-300 bg-white text-[#3E1F00] placeholder-amber-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400">🔍</span>
          </div>

          {loadingAreas ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {/* Area Cards Grid */}
              {!selectedArea && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                  {filteredAreas.map((area) => (
                    <button
                      key={area.strArea}
                      onClick={() => fetchMealsByArea(area.strArea)}
                      className="bg-white border border-amber-200 rounded-2xl p-4 text-center hover:bg-amber-50 hover:border-amber-400 hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-200">
                        {areaFlags[area.strArea] || "🌍"}
                      </div>
                      <p className="text-[#3E1F00] font-semibold text-sm">{area.strArea}</p>
                      {mealCounts[area.strArea] !== undefined && (
                        <p className="text-amber-500 text-xs mt-1">
                          {mealCounts[area.strArea]} meals
                        </p>
                      )}
                    </button>
                  ))}
                  {filteredAreas.length === 0 && (
                    <p className="col-span-full text-amber-600 text-center py-10">
                      No cuisines found
                    </p>
                  )}
                </div>
              )}

              {/* Meals Panel */}
              {selectedArea && (
                <div>
                  {/* Back Button + Title */}
                  <div className="flex items-center gap-3 mb-6">
                    <button
                      onClick={() => { setSelectedArea(null); setMeals([]); }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-amber-300 text-[#5C2E00] text-sm font-medium hover:bg-amber-50 transition-all"
                    >
                      ← Back
                    </button>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{areaFlags[selectedArea] || "🌍"}</span>
                      <div>
                        <h3 className="text-[#3E1F00] font-bold text-xl">{selectedArea} Cuisine</h3>
                        {!loadingMeals && (
                          <p className="text-amber-500 text-xs">{meals.length} recipes</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {loadingMeals ? (
                    <div className="flex justify-center py-16">
                      <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : meals.length === 0 ? (
                    <p className="text-amber-600 text-center py-10">No meals found</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {meals.map((meal) => (
                        <div
                          key={meal.idMeal}
                          onClick={() => onMealClick && onMealClick(meal.idMeal)}
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
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
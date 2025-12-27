const API_BASE = "https://www.themealdb.com/api/json/v1/1";

export const getCategories = async () => {
  const res = await fetch(`${API_BASE}/categories.php`);
  const data = await res.json();
  return data.categories || [];
};

export const getMeals = async (category = "") => {
  const url =
    category && category !== "All"
      ? `${API_BASE}/filter.php?c=${category}`
      : `${API_BASE}/search.php?s=`;

  const res = await fetch(url);
  const data = await res.json();
  return data.meals || [];
};

export const getMealDetails = async (id) => {
  const res = await fetch(`${API_BASE}/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
};

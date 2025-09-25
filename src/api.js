const API_BASE = "https://www.themealdb.com/api/json/v1/1";

export async function fetchMealsByIngredient(ingredient) {
  const url = `${API_BASE}/filter.php?i=${encodeURIComponent(ingredient)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch meals");
  return res.json(); // { meals: [...] } or { meals: null }
}

export async function fetchMealById(id) {
  const url = `${API_BASE}/lookup.php?i=${encodeURIComponent(id)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch meal details");
  return res.json(); // { meals: [ {...} ] }
}

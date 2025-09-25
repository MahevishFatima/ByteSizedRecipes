import React, { useState } from "react";
import { fetchMealsByIngredient, fetchMealById } from "./api";
import SearchBar from "./components/SearchBar";
import MealGrid from "./components/MealGrid";
import MealModal from "./components/MealModal";

export default function App() {
  const [ingredient, setIngredient] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [error, setError] = useState("");

  async function onSearch() {
    if (!ingredient.trim()) {
      setError("Please provide an ingredient.");
      setMeals([]);
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data = await fetchMealsByIngredient(ingredient.trim());
      setMeals(data.meals || []);
      if (!data.meals) setError(`No recipes found for "${ingredient}"`);
    } catch (err) {
      setError("Network error. Try again.");
      setMeals([]);
    } finally {
      setLoading(false);
    }
  }

  async function openMeal(id) {
    try {
      setLoading(true);
      const data = await fetchMealById(id);
      setSelectedMeal(data.meals ? data.meals[0] : null);
    } catch (err) {
      setError("Failed to load meal details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                className="inline-block"
              >
                <path
                  d="M3 3v6h6"
                  stroke="#4F46E5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 21v-6h-6"
                  stroke="#4F46E5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              ByteSized Recipes
            </h1>
            <p className="text-sm text-gray-600">
              Find meals by the ingredients you have — quick and simple.
            </p>
          </div>
        </header>

        <SearchBar
          ingredient={ingredient}
          setIngredient={setIngredient}
          onSearch={onSearch}
        />

        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
        {loading && <div className="mb-4 text-sm text-gray-500">Loading…</div>}

        <main>
          <MealGrid meals={meals} onSelect={openMeal} />
        </main>
      </div>

      {selectedMeal && (
        <MealModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}
    </div>
  );
}

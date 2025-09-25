import React, { useEffect } from "react";

function extractIngredients(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      list.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }
  return list;
}

export default function MealModal({ meal, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!meal) return null;
  const ingredients = extractIngredients(meal);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white max-w-3xl w-full rounded-lg overflow-auto max-h-[90vh] shadow-lg">
        <div className="flex justify-between items-start p-4 border-b">
          <h2 className="text-xl font-bold">{meal.strMeal}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="px-3 py-1 rounded bg-red-100 text-red-700"
          >
            Close
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full rounded"
            />
            {meal.strArea && (
              <p className="mt-2 text-sm">Cuisine: {meal.strArea}</p>
            )}
            {meal.strCategory && (
              <p className="text-sm">Category: {meal.strCategory}</p>
            )}
            {meal.strTags && <p className="text-sm">Tags: {meal.strTags}</p>}
            {meal.strYoutube && (
              <a
                className="text-indigo-600 inline-block mt-2 text-sm"
                href={meal.strYoutube}
                target="_blank"
                rel="noreferrer"
              >
                Watch on YouTube
              </a>
            )}
          </div>

          <div className="md:col-span-2">
            <h3 className="font-semibold mb-2">Ingredients</h3>
            <ul className="list-disc list-inside text-sm mb-4">
              {ingredients.map((ing, i) => (
                <li key={i}>
                  {ing.measure ? `${ing.measure} ` : ""}
                  {ing.ingredient}
                </li>
              ))}
            </ul>

            <h3 className="font-semibold mb-2">Instructions</h3>
            <p className="text-sm whitespace-pre-line">
              {meal.strInstructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import MealCard from "./MealCard";

export default function MealGrid({ meals, onSelect }) {
  if (!meals || meals.length === 0) {
    return <p className="text-sm text-gray-600">No meals found.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {meals.map((m) => (
        <MealCard key={m.idMeal} meal={m} onClick={onSelect} />
      ))}
    </div>
  );
}

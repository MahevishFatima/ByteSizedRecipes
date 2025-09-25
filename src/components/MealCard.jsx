import React from "react";

export default function MealCard({ meal, onClick }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(meal.idMeal)}
      onKeyDown={(e) => e.key === "Enter" && onClick(meal.idMeal)}
      className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md cursor-pointer"
    >
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-40 object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-sm">{meal.strMeal}</h3>
      </div>
    </div>
  );
}

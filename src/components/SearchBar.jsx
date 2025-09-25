import React from "react";

export default function SearchBar({ ingredient, setIngredient, onSearch }) {
  const suggestions = ["chicken", "egg", "beef", "onion", "tomato"];

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <input
          aria-label="ingredient"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          placeholder="Type an ingredient (e.g. chicken)"
          className="flex-1 p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={onSearch}
          className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Search
        </button>
      </div>

      <div className="mt-3 flex gap-2 flex-wrap">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => {
              setIngredient(s);
              onSearch();
            }}
            className="text-sm px-3 py-1 rounded-full bg-white border hover:bg-indigo-50"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

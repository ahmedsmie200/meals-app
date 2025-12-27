import React from "react";
import clsx from "clsx"; 

export default function CategoriesTabs({ categories, selected, onSelect, className }) {
  const allCategories = ["All", ...categories.map(c => c.strCategory)];

  return (
    <div className={clsx("flex flex-wrap gap-2 mt-6", className)}>
      {allCategories.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={clsx(
            "px-5 py-2 rounded-full border text-sm font-medium transition",
            selected === cat
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

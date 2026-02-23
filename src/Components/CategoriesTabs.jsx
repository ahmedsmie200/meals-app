import React from "react";
import clsx from "clsx";

export default function CategoriesTabs({ categories, selected, onSelect, className }) {
  const allCategories = ["All", ...categories.map((c) => c.strCategory)];

  return (
    <div className={clsx("flex flex-wrap gap-2 mt-6", className)}>
      {allCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={clsx(
            "px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200",
            selected === cat
              ? "bg-[#3E1F00] text-white border-[#3E1F00] shadow"
              : "bg-white text-[#5C2E00] border-amber-300 hover:bg-amber-50 hover:border-amber-500"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <Link
      to={`/recipes/${recipe._id}`}
      className="block hover:scale-105 transition-transform duration-200"
    >
      <div className="bg-white border rounded-2xl shadow-md hover:shadow-xl overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-48 w-full object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 truncate">
            {recipe.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            ⭐ {recipe.averageRating || "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;

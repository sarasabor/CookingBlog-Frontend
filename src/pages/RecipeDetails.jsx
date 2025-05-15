import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/api";
import { motion } from "framer-motion";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-green-500"></div>
      </div>
    );
  }

  if (!recipe) {
    return <p className="text-center text-gray-500 mt-10">Recipe not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{recipe.title}</h2>
          <p className="text-gray-600 mb-4">By {recipe.userId?.username || "Unknown"}</p>

          <div className="flex items-center gap-2 text-yellow-500 mb-4">
            <span className="text-sm font-medium text-gray-600">Rating:</span>
            <span className="text-lg">⭐ {recipe.averageRating || "N/A"}</span>
          </div>

          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {recipe.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default RecipeDetails;
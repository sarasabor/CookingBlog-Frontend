import React from "react";
import { useEffect, useState, useCallback } from "react";
import { getAllRecipes } from "../services/api";
import RecipeCard from "../components/RecipeCard";
import { motion } from "framer-motion";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllRecipes({ page, search: debouncedSearch });
      setRecipes(data.recipes);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">🍲 Recipes</h1>

      {/* Search input */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full sm:w-2/3 md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
      </div>

      {/* Recipes list */}
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-green-500"></div>
        </div>
      ) : recipes.length === 0 ? (
        <p className="text-center text-gray-500">No recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe, index) => (
            <motion.div
              key={recipe._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <RecipeCard recipe={recipe} />
            </motion.div>
          ))}
        </div>
      )}

      {/*  Pagination */}
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={`page-${i}`}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm transition-all duration-200 ${
              i + 1 === page
                ? "bg-green-600 text-white scale-105"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-green-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Recipes;

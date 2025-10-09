import React, { useEffect, useState } from "react";
import { getAllRecipes } from "../services/api";
import RecipeCard from "../context/components/RecipeCard";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../components/LoadingSpinner";
import RecipeCardSkeleton from "../components/RecipeCardSkeleton";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedMood, setSelectedMood] = useState("");

  const { t } = useTranslation("recipes");

  const moods = [
    "hungry", "sad", "stressed", "tired", "relaxed",
    "happy", "bored", "romantic", "anxious", "energetic"
  ];

  useEffect(() => {
    
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllRecipes({ page, search, mood: selectedMood });

        setRecipes(data.recipes);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, search, selectedMood]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#567158] mb-8 text-center">
        {t("title")}
      </h1>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8 space-y-6">
        {/* Mood Filter */}
        <div>
          <label className="block mb-3 text-sm font-semibold text-gray-700 uppercase tracking-wide text-center">
            {t("filterByMood")}
          </label>
          <div className="flex flex-wrap justify-center gap-2">
            {moods.map((mood) => (
              <button
                key={mood}
                onClick={() => {
                  setSelectedMood(mood === selectedMood ? "" : mood);
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-xl text-sm capitalize font-medium transition-all duration-200 ${
                  selectedMood === mood
                    ? "bg-[#567158] text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:shadow-sm"
                }`}
              >
                {t(mood)}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div>
          <label className="block mb-3 text-sm font-semibold text-gray-700 uppercase tracking-wide text-center">
            {t("searchRecipes")}
          </label>
          <div className="flex justify-center">
            <div className="relative w-full sm:w-2/3 md:w-1/2">
              <input
                type="text"
                placeholder={t("search")}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-gray-50 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#567158]/20 transition-all duration-200 shadow-sm text-gray-700"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <RecipeCardSkeleton key={index} />
          ))}
        </div>
      ) : recipes.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg font-medium">{t("noResults")}</p>
          <p className="text-gray-400 text-sm mt-2">Essayez de modifier vos critères de recherche</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
  
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-150 ${
              i + 1 === page
                ? "bg-[#567158] text-white shadow"
                : "bg-gray-200 text-gray-800 hover:bg-[#dfeadf]"
            }`}
          >
            {t("page")} {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Recipes;

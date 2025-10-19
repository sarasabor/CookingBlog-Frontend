import React, { useEffect, useState } from "react";
import { getAllRecipes } from "../services/api";
import RecipeCard from "../context/components/RecipeCard";
import { useTranslation } from "react-i18next";

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
        const response = await getAllRecipes({ page, search, mood: selectedMood });
        const data = response.data;

        if (data && data.recipes) {
          setRecipes(data.recipes);
          setTotalPages(data.totalPages || 1);
        } else {
          setRecipes([]);
          setTotalPages(1);
        }
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setRecipes([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, search, selectedMood]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#567158] to-[#4a5d4b] bg-clip-text text-transparent mb-4">{t("title")}</h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto font-medium">{t("subtitle")}</p>
      </div>

      {/* Filters */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Search */}
          <div>
            <label className="form-label">{t("search")}</label>
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="form-input"
            />
          </div>

          {/* Mood Filter */}
          <div>
            <label className="form-label">{t("mood")}</label>
            <select
              value={selectedMood}
              onChange={(e) => {
                setSelectedMood(e.target.value);
                setPage(1);
              }}
              className="form-input"
            >
              <option value="">{t("allMoods")}</option>
              {moods.map((mood) => (
                <option key={mood} value={mood}>
                  {t(`moods.${mood}`)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Clear Filters */}
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setSearch("");
              setSelectedMood("");
              setPage(1);
            }}
            className="btn-outline btn-small"
          >
            {t("clearFilters")}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-56 bg-gradient-to-br from-gray-200 to-gray-100 rounded-xl mb-4"></div>
              <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg mb-3"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg w-3/4"></div>
            </div>
          ))}
        </div>
      ) : !recipes || recipes.length === 0 ? (
        <div className="text-center py-20">
          <div className="inline-block bg-white/50 backdrop-blur-sm rounded-full shadow-lg mb-6">
            <div className="text-7xl">🍽️</div>
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-3">{t("noRecipes")}</h3>
          <p className="text-gray-600 text-lg">{t("noRecipesDescription")}</p>
        </div>
      ) : (
        <>
          {/* Recipes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="btn-outline btn-small disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t("previous")}
              </button>
              
              <span className="px-4 py-2 text-gray-600 font-medium">
                {t("page")} {page} {t("of")} {totalPages}
              </span>
              
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="btn-outline btn-small disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t("next")}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Recipes;
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#567158] mb-4">{t("title")}</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : !recipes || recipes.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">{t("noRecipes")}</h3>
          <p className="text-gray-500">{t("noRecipesDescription")}</p>
        </div>
      ) : (
        <>
          {/* Recipes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
import React, { useEffect, useState } from "react";
import RecipeCard from "../context/components/RecipeCard";
import { useTranslation } from "react-i18next";
import api from "../services/api";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import RecipeCardSkeleton from "../components/RecipeCardSkeleton";

function Favorites() {
  const { t } = useTranslation("favorites");
  const [recipes, setRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [moodFilter, setMoodFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const moodOptions = t("moods", { returnObjects: true });
  const timeOptions = t("timeFilters", { returnObjects: true });

  const navigate = useNavigate();

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users/favorites");
      const data = Array.isArray(res.data) ? res.data : [];
      setRecipes(data);
      setFiltered(data);
    } catch (err) {
      console.error("Error fetching favorites from server:", err);
      setRecipes([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (recipeId) => {
    try {
      await api.delete(`/users/favorites/${recipeId}`);
      const updated = recipes.filter((r) => r._id !== recipeId);
      setRecipes(updated);
      setFiltered(updated);
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  useEffect(() => {
    let result = [...recipes];

    if (moodFilter !== "all") {
      result = result.filter((r) => r.mood === moodFilter);
    }

    if (timeFilter !== "all") {
      result = result.filter((r) => {
        if (timeFilter === "short") return r.cookTime <= 15;
        if (timeFilter === "medium") return r.cookTime > 15 && r.cookTime <= 45;
        if (timeFilter === "long") return r.cookTime > 45;
        return true;
      });
    }

    if (search.trim() !== "") {
      result = result.filter((r) =>
        r.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [moodFilter, timeFilter, search, recipes]);

  return (
    <div className="max-w-6xl px-4 py-10 mx-auto">
      <h1 className="text-3xl font-bold text-[#567158] mb-8 text-center">
        {t("title")}
      </h1>

      {/* Filters Section */}
      <div className="p-6 mb-8 space-y-4 bg-white shadow-lg rounded-xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Search */}
          <div className="md:col-span-1">
            <label className="block mb-2 text-sm font-semibold tracking-wide text-gray-700 uppercase">{t("search")}</label>
            <div className="relative">
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-50 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#567158]/20 transition-all duration-200 text-gray-700 shadow-sm"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Mood Filter */}
          <div>
            <label className="block mb-2 text-sm font-semibold tracking-wide text-gray-700 uppercase">{t("mood")}</label>
            <div className="relative">
              <select
                value={moodFilter}
                onChange={(e) => setMoodFilter(e.target.value)}
                className="w-full appearance-none bg-gray-50 rounded-xl p-3 pr-12 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#567158]/20 transition-all duration-200 text-gray-700 font-medium shadow-sm"
              >
                {Array.isArray(moodOptions) &&
                  moodOptions.map(({ key, label }) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Time Filter */}
          <div>
            <label className="block mb-2 text-sm font-semibold tracking-wide text-gray-700 uppercase">{t("time")}</label>
            <div className="relative">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="w-full appearance-none bg-gray-50 rounded-xl p-3 pr-12 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#567158]/20 transition-all duration-200 text-gray-700 font-medium shadow-sm"
              >
                {Array.isArray(timeOptions) &&
                  timeOptions.map(({ key, label }) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <RecipeCardSkeleton key={index} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center">
          <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-500">{t("noResults")}</p>
          <p className="mt-2 text-sm text-gray-400">Ajoutez des recettes à vos favoris pour les voir ici</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((recipe) => (
            <div
              key={recipe._id}
              onClick={() => navigate(`/recipes/${recipe._id}`)}
              className="relative overflow-hidden transition-transform duration-200 bg-white shadow-md cursor-pointer rounded-2xl hover:shadow-xl hover:scale-105 group"
            >
              <RecipeCard recipe={recipe} hideFavoriteButton />

              <button
                onClick={(e) => {
                  e.stopPropagation(); 
                  removeFromFavorites(recipe._id);
                }}
                className="absolute text-red-500 transition-all duration-200 bg-white rounded-full shadow-lg top-3 left-3 group hover:bg-red-500 hover:text-white"
                title={t("remove")}
              >
                <Trash2 className="w-4 h-4" />
                <span className="absolute px-2 py-1 text-xs text-white transition-all duration-200 scale-0 -translate-y-1/2 bg-gray-800 rounded shadow left-10 top-1/2 group-hover:scale-100">
                  {t("remove")}
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;

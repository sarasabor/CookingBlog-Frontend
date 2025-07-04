import React, { useEffect, useState } from "react";
import RecipeCard from "../context/components/RecipeCard";
import { useTranslation } from "react-i18next";
import api from "../services/api";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const { t } = useTranslation("favorites");
  const [recipes, setRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [moodFilter, setMoodFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [search, setSearch] = useState("");

  const moodOptions = t("moods", { returnObjects: true });
  const timeOptions = t("timeFilters", { returnObjects: true });

  const navigate = useNavigate();

  const fetchFavorites = async () => {
    try {
      const res = await api.get("/users/favorites");
      const data = Array.isArray(res.data) ? res.data : [];
      setRecipes(data);
      setFiltered(data);
    } catch (err) {
      console.error("Error fetching favorites from server:", err);
      setRecipes([]);
      setFiltered([]);
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
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-[#2d4032] mb-6 text-center">
        {t("title")}
      </h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow w-full md:w-1/3"
        />
        <div className="flex gap-4">
          <select
            value={moodFilter}
            onChange={(e) => setMoodFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg shadow"
          >
            {Array.isArray(moodOptions) &&
              moodOptions.map(({ key, label }) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
          </select>

          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg shadow"
          >
            {Array.isArray(timeOptions) &&
              timeOptions.map(({ key, label }) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">{t("noResults")}</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((recipe) => (
            <div
              key={recipe._id}
              onClick={() => navigate(`/recipes/${recipe._id}`)}
              className="relative cursor-pointer bg-white border rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-transform duration-200 hover:scale-105 group"
            >
              <RecipeCard recipe={recipe} hideFavoriteButton />

              <button
                onClick={(e) => {
                  e.stopPropagation(); 
                  removeFromFavorites(recipe._id);
                }}
                className="absolute top-3 left-3 group bg-white text-red-500 border border-red-300 hover:bg-red-500 hover:text-white hover:border-red-500 rounded-full p-2 shadow transition-all duration-200"
                title={t("remove")}
              >
                <Trash2 className="w-4 h-4" />
                <span className="absolute left-10 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow transition-all duration-200">
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

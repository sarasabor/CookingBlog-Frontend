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
      <h1 className="text-3xl font-bold text-[#2d4032] mb-6 text-center">
        🍲 {t("title")}
      </h1>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => {
              setSelectedMood(mood === selectedMood ? "" : mood);
              setPage(1);
            }}
            className={`px-4 py-1 rounded-full text-sm capitalize border transition duration-150 ${
              selectedMood === mood
                ? "bg-[#567158] text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {t(mood)}
          </button>
        ))}
      </div>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder={t("search")}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full sm:w-2/3 md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#567158] transition"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">{t("loading")}</p>
      ) : recipes.length === 0 ? (
        <p className="text-center text-gray-500">{t("noResults")}</p>
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

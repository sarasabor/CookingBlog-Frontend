import React,{ useEffect, useState } from "react";
import { getAllRecipes } from "../services/api";
import RecipeCard from "../components/RecipeCard";
import { useTranslation } from "react-i18next";


function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllRecipes({ page, search });
        setRecipes(data.recipes);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#2d4032] mb-6 text-center">
        🍲 {t("Recipes")}
      </h1>

      {/* 🔍 Search input */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder={t("Search")}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset to first page when search changes
          }}
          className="w-full sm:w-2/3 md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#567158] transition"
        />
      </div>

      {/* 🌀 Recipes list */}
      {loading ? (
        <p className="text-center text-gray-500">{t("Loading")}</p>
      ) : recipes.length === 0 ? (
        <p className="text-center text-gray-500">{t("No Results Found")}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}

      {/* 📄 Pagination */}
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
            {t("recipes.page")} {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Recipes;

import React, { useState } from "react";
import api from "../services/api";
import RecipeCard from "../context/components/RecipeCard";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function MoodSuggestions() {
  const { t, i18n } = useTranslation("moodSuggestions");
  const [mood, setMood] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!mood) return;

    setLoading(true);
    try {
      const res = await services/api.get(`/recipes/mood/${mood}`, {
        headers: {
          "Accept-Language": i18n.language, 
        },
      });
      setRecipes(res.data);
    } catch (err) {
      console.error("Error fetching mood suggestions:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-[#567158] mb-8">
        {t("title")}
      </h2>

      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8"
      >
        <div className="relative">
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full sm:w-64 appearance-none bg-gray-50 rounded-xl p-3 pr-12 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#567158]/20 transition-all duration-200 shadow-sm text-gray-700 font-medium"
            required
          >
            <option value="">{t("selectMood")}</option>
            <option value="hungry">{t("hungry")}</option>
            <option value="sad">{t("sad")}</option>
            <option value="stressed">{t("stressed")}</option>
            <option value="tired">{t("tired")}</option>
            <option value="relaxed">{t("relaxed")}</option>
            <option value="happy">{t("happy")}</option>
            <option value="bored">{t("bored")}</option>
            <option value="anxious">{t("anxious")}</option>
            <option value="energetic">{t("energetic")}</option>
            <option value="romantic">{t("romantic")}</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary"
        >
          {t("search")}
        </button>
      </form>

      <div>
        {loading ? (
          <p className="text-center text-gray-500">{t("loading")}</p>
        ) : recipes.length === 0 ? (
          <p className="text-center text-gray-400">{t("noResults")}</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default MoodSuggestions;

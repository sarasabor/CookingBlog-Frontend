import React, { useState } from "react";
import axios from "axios";
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
      const res = await axios.get(
        `http://localhost:5000/api/recipes/mood/${mood}`,
        {
          headers: {
            "Accept-Language": i18n.language, 
          },
        }
      );
      setRecipes(res.data);
    } catch (err) {
      console.error("Error fetching mood suggestions:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* 🧘 Title */}
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
        🧘 {t("title")}
      </h2>

      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8"
      >
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="w-full sm:w-64 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
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

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
        >
          🔍 {t("search")}
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

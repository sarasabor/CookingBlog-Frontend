import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../context/components/RecipeCard";

function SmartSuggestions() {
  const { t, i18n } = useTranslation("smartSuggestions");
  const navigate = useNavigate();

  const [mood, setMood] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [servings, setServings] = useState(2);
  const [maxCookTime, setMaxCookTime] = useState("");
  const [minRating, setMinRating] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const ingredientsByCategory = t("ingredientsByCategory", { returnObjects: true });
  const categories = t("categories", { returnObjects: true });

  const handleCheckboxChange = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedIngredients.length < 2 || servings < 1) return;

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/recipes/smart-suggestions",
        {
          mood: mood || undefined,
          ingredients: selectedIngredients,
          servings,
          maxCookTime: maxCookTime ? parseInt(maxCookTime) : undefined,
          minRating: minRating ? parseFloat(minRating) : undefined,
        },
        {
          headers: {
            "Accept-Language": i18n.language, 
          },
        }
      );
      setRecipes(res.data);
    } catch (err) {
      console.error("Error fetching smart suggestions:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
        🧠 {t("moodTitle")}
      </h2>

      <form onSubmit={handleSubmit} className="bg-[#faf7f3] p-6 rounded-xl shadow space-y-6">

        <div>
          <label className="block mb-2 font-medium">{t("selectMood")}:</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">{t("chooseMood")}</option>
            {["hungry", "sad", "stressed", "tired", "relaxed", "happy", "bored", "anxious", "energetic", "romantic"].map((m) => (
              <option key={m} value={m}>{t(m)}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-4 font-medium">{t("selectIngredients")}:</label>
          {Object.entries(ingredientsByCategory).map(([categoryKey, ingredients]) => (
            <div key={categoryKey} className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                {categories[categoryKey] || categoryKey}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Array.isArray(ingredients) &&
                  ingredients.map((ingredient) => (
                    <label key={ingredient} className="text-sm flex items-center">
                      <input
                        type="checkbox"
                        value={ingredient}
                        checked={selectedIngredients.includes(ingredient)}
                        onChange={() => handleCheckboxChange(ingredient)}
                        className="mr-2"
                      />
                      {t(`ingredients.${ingredient}`, ingredient)}
                    </label>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          <label className="block mb-2 font-medium">{t("people")}:</label>
          <input
            type="number"
            min="1"
            value={servings}
            onChange={(e) => setServings(Number(e.target.value))}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">{t("maxCookTime")}:</label>
          <input
            type="number"
            min="1"
            value={maxCookTime}
            onChange={(e) => setMaxCookTime(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="e.g. 30"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">{t("minRating")}:</label>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="e.g. 4"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition"
        >
          🔍 {t("suggest")}
        </button>
      </form>

      <div className="mt-10">
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
              <div
                key={recipe._id}
                className="cursor-pointer"
                onClick={() => navigate(`/recipes/${recipe._id}`)}
              >
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default SmartSuggestions;

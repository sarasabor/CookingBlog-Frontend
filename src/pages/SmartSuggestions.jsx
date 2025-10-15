// import React, { useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
// import RecipeCard from "../context/components/RecipeCard";

// function SmartSuggestions() {
//   const { t, i18n } = useTranslation("smartSuggestions");
//   const navigate = useNavigate();

//   const [mood, setMood] = useState("");
//   const [selectedIngredients, setSelectedIngredients] = useState([]);
//   const [servings, setServings] = useState(2);
//   const [maxCookTime, setMaxCookTime] = useState("");
//   const [minRating, setMinRating] = useState("");
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const ingredientsByCategory = t("ingredientsByCategory", { returnObjects: true });
//   const categories = t("categories", { returnObjects: true });

//   const handleCheckboxChange = (ingredient) => {
//     setSelectedIngredients((prev) =>
//       prev.includes(ingredient)
//         ? prev.filter((i) => i !== ingredient)
//         : [...prev, ingredient]
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (selectedIngredients.length < 2 || servings < 1) return;

//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/services/api/recipes/smart-suggestions",
//         {
//           mood: mood || undefined,
//           ingredients: selectedIngredients,
//           servings,
//           maxCookTime: maxCookTime ? parseInt(maxCookTime) : undefined,
//           minRating: minRating ? parseFloat(minRating) : undefined,
//         },
//         {
//           headers: {
//             "Accept-Language": i18n.language, 
//           },
//         }
//       );
//       setRecipes(res.data);
//     } catch (err) {
//       console.error("Error fetching smart suggestions:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
//         🧠 {t("moodTitle")}
//       </h2>

//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-6">

//         <div>
//           <label className="block mb-2 font-medium">{t("selectMood")}:</label>
//           <select
//             value={mood}
//             onChange={(e) => setMood(e.target.value)}
//             className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//           >
//             <option value="">{t("chooseMood")}</option>
//             {["hungry", "sad", "stressed", "tired", "relaxed", "happy", "bored", "anxious", "energetic", "romantic"].map((m) => (
//               <option key={m} value={m}>{t(m)}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block mb-4 font-medium">{t("selectIngredients")}:</label>
//           {Object.entries(ingredientsByCategory).map(([categoryKey, ingredients]) => (
//             <div key={categoryKey} className="mb-4">
//               <h4 className="text-sm font-semibold text-gray-700 mb-2">
//                 {categories[categoryKey] || categoryKey}
//               </h4>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//                 {Array.isArray(ingredients) &&
//                   ingredients.map((ingredient) => (
//                     <label key={ingredient} className="text-sm flex items-center">
//                       <input
//                         type="checkbox"
//                         value={ingredient}
//                         checked={selectedIngredients.includes(ingredient)}
//                         onChange={() => handleCheckboxChange(ingredient)}
//                         className="mr-2"
//                       />
//                       {t(`ingredients.${ingredient}`, ingredient)}
//                     </label>
//                   ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div>
//           <label className="block mb-2 font-medium">{t("people")}:</label>
//           <input
//             type="number"
//             min="1"
//             value={servings}
//             onChange={(e) => setServings(Number(e.target.value))}
//             className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 font-medium">{t("maxCookTime")}:</label>
//           <input
//             type="number"
//             min="1"
//             value={maxCookTime}
//             onChange={(e) => setMaxCookTime(e.target.value)}
//             className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//             placeholder="e.g. 30"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 font-medium">{t("minRating")}:</label>
//           <input
//             type="number"
//             min="0"
//             max="5"
//             step="0.1"
//             value={minRating}
//             onChange={(e) => setMinRating(e.target.value)}
//             className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//             placeholder="e.g. 4"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition"
//         >
//           🔍 {t("suggest")}
//         </button>
//       </form>

//       <div className="mt-10">
//         {loading ? (
//           <p className="text-center text-gray-500">{t("loading")}</p>
//         ) : recipes.length === 0 ? (
//           <p className="text-center text-gray-400">{t("noResults")}</p>
//         ) : (
//           <motion.div
//             className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             {recipes.map((recipe) => (
//               <div
//                 key={recipe._id}
//                 className="cursor-pointer"
//                 onClick={() => navigate(`/recipes/${recipe._id}`)}
//               >
//                 <RecipeCard recipe={recipe} />
//               </div>
//             ))}
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SmartSuggestions;

import React, { useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../context/components/RecipeCard";

function SmartSuggestions() {
  const { t, i18n } = useTranslation("smartSuggestions");
  const lang = i18n.language.slice(0, 2);
  const navigate = useNavigate();

  const [mood, setMood] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [servings, setServings] = useState(2);
  const [maxCookTime, setMaxCookTime] = useState("");
  const [minRating, setMinRating] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ingredientSearch, setIngredientSearch] = useState("");

  const ingredientsByCategory = t("ingredientsByCategory", { returnObjects: true });
  const categories = t("categories", { returnObjects: true });

  // Filter ingredients based on search
  const filteredIngredientsByCategory = React.useMemo(() => {
    if (!ingredientSearch.trim()) return ingredientsByCategory;
    
    const filtered = {};
    Object.entries(ingredientsByCategory).forEach(([categoryKey, ingredients]) => {
      if (Array.isArray(ingredients)) {
        const filteredIngredients = ingredients.filter(ingredient =>
          ingredient.toLowerCase().includes(ingredientSearch.toLowerCase()) ||
          t(`ingredients.${ingredient}`, ingredient).toLowerCase().includes(ingredientSearch.toLowerCase())
        );
        if (filteredIngredients.length > 0) {
          filtered[categoryKey] = filteredIngredients;
        }
      }
    });
    return filtered;
  }, [ingredientsByCategory, ingredientSearch, t]);

  const handleCheckboxChange = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ شرط مرن: يكفي mood أو مكونين على الأقل
    if (!mood && selectedIngredients.length < 2) {
      alert("Please select at least a mood or two ingredients");
      return;
    }

    setLoading(true);

    // ✅ Debug: API URL check
    console.log("🔥 Form Submitted");
    console.log("API URL:", import.meta.env.VITE_API_URL);
    console.log("Payload:", {
      mood,
      ingredients: selectedIngredients,
      servings,
      maxCookTime,
      minRating,
    });

    try {
      const res = await api.post("/recipes/smart-suggestions", {
        mood: mood || undefined,
        ingredients: selectedIngredients,
        servings,
        maxCookTime: maxCookTime ? parseInt(maxCookTime) : undefined,
        minRating: minRating ? parseFloat(minRating) : undefined,
      }, {
        headers: {
          "Accept-Language": lang,
        },
      });

      setRecipes(res.data);
    } catch (err) {
      console.error("❌ Error fetching smart suggestions:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-[#567158] mb-8">
        {t("moodTitle")}
      </h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-6">

        {/* ✅ Mood */}
        <div>
          <label className="block mb-3 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t("selectMood")}</label>
          <div className="relative">
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full appearance-none bg-gray-50 rounded-xl p-4 pr-12 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#567158]/20 transition-all duration-200 text-gray-700 font-medium shadow-sm"
            >
              <option value="">{t("chooseMood")}</option>
              {[
                "hungry", "sad", "stressed", "tired", "relaxed",
                "happy", "bored", "anxious", "energetic", "romantic"
              ].map((m) => (
                <option key={m} value={m}>{t(m)}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* ✅ Ingredients */}
        <div>
          <label className="block mb-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t("selectIngredients")}</label>
          
          {/* 🔍 Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder={t("searchIngredients")}
                value={ingredientSearch}
                onChange={(e) => setIngredientSearch(e.target.value)}
                className="w-full bg-gray-50 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#567158]/20 transition-all duration-200 text-gray-700 shadow-sm"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Selected ingredients counter */}
            {selectedIngredients.length > 0 && (
              <div className="mt-4 flex items-center justify-between bg-[#567158]/10 rounded-lg p-3">
                <span className="text-sm font-medium text-[#567158]">
                  {t("ingredientsSelected", { count: selectedIngredients.length })}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedIngredients([])}
                  className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
                >
                  {t("clearAll")}
                </button>
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-xl p-6 space-y-6">
            {Object.entries(filteredIngredientsByCategory).length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium">{t("noIngredientsFound")}</p>
                <p className="text-gray-400 text-sm mt-1">{t("tryAnotherSearch")}</p>
              </div>
            ) : (
              Object.entries(filteredIngredientsByCategory).map(([categoryKey, ingredients]) => (
              <div key={categoryKey}>
                <h4 className="text-base font-bold text-[#567158] mb-4 pb-2 border-b border-gray-200">
                  {categories[categoryKey] || categoryKey}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Array.isArray(ingredients) &&
                    ingredients.map((ingredient) => (
                      <label key={ingredient} className="flex items-center group cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            value={ingredient}
                            checked={selectedIngredients.includes(ingredient)}
                            onChange={() => handleCheckboxChange(ingredient)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 border-2 rounded-md mr-3 transition-all duration-200 flex items-center justify-center ${
                            selectedIngredients.includes(ingredient) 
                              ? 'bg-[#567158] border-[#567158]' 
                              : 'border-gray-300 group-hover:border-[#567158]'
                          }`}>
                            {selectedIngredients.includes(ingredient) && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-[#567158] transition-colors">
                          {t(`ingredients.${ingredient}`, ingredient)}
                        </span>
                      </label>
                    ))}
                </div>
              </div>
              ))
            )}
          </div>
        </div>

        {/* ✅ Other filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-3 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t("people")}</label>
            <input
              type="number"
              min="1"
              value={servings}
              onChange={(e) => setServings(Number(e.target.value))}
              className="w-full bg-gray-50 rounded-xl p-4 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#567158]/20 transition-all duration-200 text-gray-700 font-medium shadow-sm"
            />
          </div>

          <div>
            <label className="block mb-3 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t("maxCookTime")}</label>
            <input
              type="number"
              min="1"
              value={maxCookTime}
              onChange={(e) => setMaxCookTime(e.target.value)}
              className="w-full bg-gray-50 rounded-xl p-4 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#567158]/20 transition-all duration-200 text-gray-700 font-medium shadow-sm"
              placeholder="30"
            />
          </div>

          <div>
            <label className="block mb-3 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t("minRating")}</label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="w-full bg-gray-50 rounded-xl p-4 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#567158]/20 transition-all duration-200 text-gray-700 font-medium shadow-sm"
              placeholder="4.0"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full btn-primary"
        >
          {t("suggest")}
        </button>
      </form>

      {/* ✅ Result section */}
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

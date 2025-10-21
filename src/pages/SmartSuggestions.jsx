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
import { motion, AnimatePresence } from "framer-motion";
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
  
  // AI Assistant states
  const [showAI, setShowAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [aiRecipes, setAiRecipes] = useState([]);
  const [selectedAIRecipe, setSelectedAIRecipe] = useState(null);

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

  // AI Assistant Handler
  const handleAIRequest = async () => {
    if (!aiPrompt.trim()) return;
    
    setAiLoading(true);
    setAiResponse("");
    setAiRecipes([]);

    try {
      const res = await api.post("/recipes/ai-suggestions", {
        prompt: aiPrompt,
        mood: mood || undefined,
        ingredients: selectedIngredients.length > 0 ? selectedIngredients : undefined,
        servings,
      }, {
        headers: {
          "Accept-Language": lang,
        },
      });

      setAiResponse(res.data.message || "");
      setAiRecipes(res.data.recipes || []);
    } catch (err) {
      console.error("❌ Error fetching AI suggestions:", err);
      setAiResponse(t("aiError"));
    } finally {
      setAiLoading(false);
    }
  };

  const clearAIChat = () => {
    setAiPrompt("");
    setAiResponse("");
    setAiRecipes([]);
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

      {/* 🤖 AI Assistant Floating Button */}
      {!showAI && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowAI(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-[#567158] to-[#3d5040] text-white rounded-full shadow-2xl flex items-center justify-center text-2xl hover:shadow-3xl transition-all duration-300 z-50"
          title={t("aiToggle")}
        >
          🤖
        </motion.button>
      )}

      {/* 🤖 AI Assistant Modal */}
      <AnimatePresence>
        {showAI && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowAI(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#567158] to-[#3d5040] text-white p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold">{t("aiAssistant")}</h3>
                  <p className="text-sm text-white/80 mt-1">{t("aiAssistantDescription")}</p>
                </div>
                <button
                  onClick={() => setShowAI(false)}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {/* Example prompts */}
                {!aiResponse && !aiLoading && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-3">{t("aiExamples")}</p>
                    <div className="space-y-2">
                      {[t("aiExample1"), t("aiExample2"), t("aiExample3")].map((example, idx) => (
                        <button
                          key={idx}
                          onClick={() => setAiPrompt(example)}
                          className="w-full text-left text-sm text-gray-600 hover:text-[#567158] hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-[#567158]/20"
                        >
                          💡 {example}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Response */}
                {aiLoading && (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 border-4 border-[#567158]/20 border-t-[#567158] rounded-full animate-spin" />
                      <p className="text-gray-600 font-medium">{t("aiThinking")}</p>
                    </div>
                  </div>
                )}

                {aiResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="bg-gradient-to-br from-[#567158]/5 to-[#567158]/10 rounded-xl p-5 border border-[#567158]/20">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-[#567158] flex items-center justify-center flex-shrink-0 text-white">
                          🤖
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#567158] mb-2">{t("aiSuggestionTitle")}</p>
                          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{aiResponse}</p>
                        </div>
                      </div>
                    </div>

                    {/* AI Recommended Recipes */}
                    {aiRecipes.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <span className="text-2xl">🤖</span>
                          <span>Recommended Recipes:</span>
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">AI Generated</span>
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                          {aiRecipes.map((recipe) => (
                            <div
                              key={recipe._id}
                              onClick={() => setSelectedAIRecipe(recipe)}
                              className="cursor-pointer hover:shadow-lg transition-shadow relative"
                            >
                              <RecipeCard recipe={recipe} />
                              <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M13 7H7v6h6V7z" />
                                  <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                                </svg>
                                <span>AI Recipe</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={clearAIChat}
                      className="w-full text-sm text-gray-600 hover:text-red-600 font-medium py-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      {t("aiClearChat")}
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAIRequest()}
                    placeholder={t("aiPromptPlaceholder")}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-[#567158] focus:ring-2 focus:ring-[#567158]/20 outline-none transition-all"
                    disabled={aiLoading}
                  />
                  <button
                    onClick={handleAIRequest}
                    disabled={!aiPrompt.trim() || aiLoading}
                    className="px-6 py-3 bg-gradient-to-r from-[#567158] to-[#3d5040] text-white rounded-xl font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {aiLoading ? "..." : t("aiAskButton")}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Recipe Details Modal */}
      <AnimatePresence>
        {selectedAIRecipe && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAIRecipe(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-t-2xl">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🤖</span>
                      <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-medium backdrop-blur-sm">
                        AI Generated Recipe
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold">
                      {selectedAIRecipe.title?.[i18n.language] || selectedAIRecipe.title?.en || "Recipe"}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedAIRecipe(null)}
                    className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedAIRecipe.description?.[i18n.language] || selectedAIRecipe.description?.en}
                  </p>
                </div>

                {/* Meta Info */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-1">⏱️</div>
                    <div className="text-sm text-gray-600">Cook Time</div>
                    <div className="text-lg font-semibold text-gray-800">{selectedAIRecipe.cookTime} min</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-1">📊</div>
                    <div className="text-sm text-gray-600">Difficulty</div>
                    <div className="text-lg font-semibold text-gray-800 capitalize">{selectedAIRecipe.difficulty}</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center col-span-2 sm:col-span-1">
                    <div className="text-2xl mb-1">💪</div>
                    <div className="text-sm text-gray-600">Nutrition</div>
                    <div className="text-xs font-medium text-gray-700 mt-1">{selectedAIRecipe.nutritionHighlights || "Balanced"}</div>
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span>🥘</span>
                    <span>Ingredients</span>
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                    {selectedAIRecipe.ingredients?.map((ing, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-2 hover:bg-white rounded-lg transition-colors">
                        <span className="text-[#567158] mt-1">•</span>
                        <span className="flex-1 text-gray-700">
                          <span className="font-semibold">{ing.quantity} {ing.unit}</span> {ing.name?.[i18n.language] || ing.name?.en || ing.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span>👨‍🍳</span>
                    <span>Instructions</span>
                  </h3>
                  <div className="space-y-4">
                    {(selectedAIRecipe.instructions?.[i18n.language] || selectedAIRecipe.instructions?.en || []).map((step, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {idx + 1}
                        </div>
                        <p className="flex-1 text-gray-700 pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                {selectedAIRecipe.tags && selectedAIRecipe.tags.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedAIRecipe.tags.map((tag, idx) => (
                        <span key={idx} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Notice */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-900 mb-1">AI Generated Recipe</h4>
                      <p className="text-sm text-purple-700">
                        This recipe was created by AI based on your preferences. It may not be saved to our database, but you can screenshot or save the details for later!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SmartSuggestions;

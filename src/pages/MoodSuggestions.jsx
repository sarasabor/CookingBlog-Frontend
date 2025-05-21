// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import RecipeCard from "../components/RecipeCard";
// import { motion } from "framer-motion";
// import { useTranslation } from "react-i18next";

// function MoodSuggestions() {
//   const [selectedMood, setSelectedMood] = useState("");
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { t, i18n } = useTranslation();

//   const moods = [
//     { value: "hungry", label: "😋 Hungry" },
//     { value: "light", label: "🧘 Light & Healthy" },
//     { value: "sweet", label: "🍬 Sweet" },
//     { value: "quick", label: "⏱️ Quick & Easy" },
//     { value: "fancy", label: "🍽️ Fancy" },
//   ];

//   // Mood تلقائي حسب الساعة
//   useEffect(() => {
//     const hours = new Date().getHours();
//     if (hours < 11) setSelectedMood("light");
//     else if (hours < 16) setSelectedMood("quick");
//     else if (hours < 20) setSelectedMood("hungry");
//     else setSelectedMood("sweet");
//   }, []);

//   const fetchRecipes = async () => {
//     if (!selectedMood) return;
//     setLoading(true);
//     try {
//       const res = await axios.get(`http://localhost:5000/api/recipes/mood/${selectedMood}`);
//       setRecipes(res.data);
//     } catch (err) {
//       console.error("Failed to fetch recipes:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const speakMood = () => {
//     const selected = moods.find((m) => m.value === selectedMood);
//     if (!selected) return;
//     const speech = new SpeechSynthesisUtterance(
//       `You selected mood: ${selected.label}. Here are some recipe suggestions for you.`
//     );
//     speech.lang = "en-US";
//     window.speechSynthesis.speak(speech);
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">
//       {/* 🌍 Language Switcher */}
//       <div className="flex justify-center gap-2 mb-4">
//         <button onClick={() => i18n.changeLanguage("en")} className="text-sm px-2 py-1 hover:underline">🇺🇸 EN</button>
//         <button onClick={() => i18n.changeLanguage("fr")} className="text-sm px-2 py-1 hover:underline">🇫🇷 FR</button>
//         <button onClick={() => i18n.changeLanguage("ar")} className="text-sm px-2 py-1 hover:underline">🇲🇦 AR</button>
//       </div>

//       <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
//         🧠 {t("title")}
//       </h2>

//       {/* Mood Selector */}
//       <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
//         <select
//           className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//           value={selectedMood}
//           onChange={(e) => setSelectedMood(e.target.value)}
//         >
//           <option value="">{t("select")}</option>
//           {moods.map((m) => (
//             <option key={m.value} value={m.value}>
//               {m.label}
//             </option>
//           ))}
//         </select>

//         <button
//           onClick={fetchRecipes}
//           className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
//         >
//           {t("suggest")}
//         </button>
//       </div>

//       {/* 🔊 Read aloud */}
//       {selectedMood && (
//         <div className="text-center mb-6">
//           <button
//             onClick={speakMood}
//             className="text-sm text-gray-600 hover:underline"
//           >
//             🔊 {t("speak")}
//           </button>
//         </div>
//       )}

//       {/* Recipe Results */}
//       {loading ? (
//         <p className="text-center">{t("loading")}</p>
//       ) : recipes.length === 0 && selectedMood ? (
//         <p className="text-center text-gray-500">{t("noResult")}</p>
//       ) : (
//         <motion.div
//           className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           {recipes.map((recipe) => (
//             <RecipeCard key={recipe._id} recipe={recipe} />
//           ))}
//         </motion.div>
//       )}
//     </div>
//   );
// }

// export default MoodSuggestions;


import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import RecipeCard from "../components/RecipeCard";

function MoodSuggestions() {
  const { t } = useTranslation();
  const [mood, setMood] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!mood) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`http://localhost:5000/api/recipes/mood/${mood}`);
      setRecipes(res.data);
    } catch (err) {
      setError(t("moodSuggestions.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-[#2d4032] mb-6">
        {t("moodSuggestions.title")}
      </h1>

      {/* Mood Selector */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="p-3 rounded-lg border bg-[#fdfcf8] w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#567158]"
        >
          <option value="">{t("moodSuggestions.selectMood")}</option>
          <option value="hungry">😋 {t("addRecipe.fields.hungry")}</option>
          <option value="light">🧘 {t("addRecipe.fields.light")}</option>
          <option value="sweet">🍬 {t("addRecipe.fields.sweet")}</option>
          <option value="quick">⏱️ {t("addRecipe.fields.quick")}</option>
          <option value="fancy">🍽️ {t("addRecipe.fields.fancy")}</option>
        </select>

        <button
          onClick={handleSearch}
          className="bg-[#567158] hover:bg-[#3f5744] text-white px-6 py-2 rounded-lg"
        >
          {t("moodSuggestions.search")}
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500">{t("loading")}</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-500">{error}</p>
      )}

      {/* Results */}
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-center text-gray-400">{t("moodSuggestions.noResults")}</p>
        )
      )}
    </div>
  );
}

export default MoodSuggestions;

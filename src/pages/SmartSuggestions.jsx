// import React, { useState } from "react";
// import axios from "axios";
// import RecipeCard from "../components/RecipeCard";
// import { motion } from "framer-motion";
// import { useTranslation } from "react-i18next";

// function SmartSuggestions() {
//   const [mood, setMood] = useState("");
//   const [selectedIngredients, setSelectedIngredients] = useState([]);
//   const [servings, setServings] = useState(2);
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { t, i18n } = useTranslation();

//   const availableIngredients = [
//     "بيض", "دقيق", "سكر", "ملح", "زيت", "بصل", "طماطم",
//     "لحم", "دجاج", "حليب", "زبدة", "ماء", "ثوم", "أرز", "كمون"
//   ];

//   const handleCheckboxChange = (ingredient) => {
//     if (selectedIngredients.includes(ingredient)) {
//       setSelectedIngredients(selectedIngredients.filter((i) => i !== ingredient));
//     } else {
//       setSelectedIngredients([...selectedIngredients, ingredient]);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!mood || selectedIngredients.length === 0 || servings < 1) return;

//     setLoading(true);
//     try {
//       const res = await axios.post("http://localhost:5000/api/recipes/smart-suggestions", {
//         mood,
//         ingredients: selectedIngredients,
//         servings,
//       });
//       setRecipes(res.data);
//     } catch (err) {
//       console.error("Error fetching smart suggestions:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">
//       {/* Language Switcher */}
//       <div className="flex justify-center gap-2 mb-4">
//         <button onClick={() => i18n.changeLanguage("en")} className="text-sm px-2 py-1 hover:underline">🇺🇸 EN</button>
//         <button onClick={() => i18n.changeLanguage("fr")} className="text-sm px-2 py-1 hover:underline">🇫🇷 FR</button>
//         <button onClick={() => i18n.changeLanguage("ar")} className="text-sm px-2 py-1 hover:underline">🇲🇦 AR</button>
//       </div>

//       <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
//         🧠 {t("moodTitle")}
//       </h2>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-8">
//         {/* Mood */}
//         <div className="mb-4">
//           <label className="block font-semibold mb-2">🎭 {t("selectMood")}:</label>
//           <select
//             className="w-full border p-2 rounded-lg"
//             value={mood}
//             onChange={(e) => setMood(e.target.value)}
//             required
//           >
//             <option value="">{t("chooseMood")}</option>
//             <option value="hungry">😋 Hungry</option>
//             <option value="light">🧘 Light & Healthy</option>
//             <option value="sweet">🍬 Sweet</option>
//             <option value="quick">⏱️ Quick & Easy</option>
//             <option value="fancy">🍽️ Fancy</option>
//           </select>
//         </div>

//         {/* Ingredients */}
//         <div className="mb-4">
//           <label className="block font-semibold mb-2">🧂 {t("selectIngredients")}:</label>
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//             {availableIngredients.map((ingredient) => (
//               <label key={ingredient} className="text-sm">
//                 <input
//                   type="checkbox"
//                   value={ingredient}
//                   checked={selectedIngredients.includes(ingredient)}
//                   onChange={() => handleCheckboxChange(ingredient)}
//                   className="mr-2"
//                 />
//                 {t(`ingredients.${ingredient}`)}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Servings */}
//         <div className="mb-4">
//           <label className="block font-semibold mb-2">👥 {t("people")}:</label>
//           <input
//             type="number"
//             min="1"
//             value={servings}
//             onChange={(e) => setServings(Number(e.target.value))}
//             className="w-full border p-2 rounded-lg"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
//         >
//           🔍 {t("suggest")}
//         </button>
//       </form>

//       {/* Results */}
//       {loading ? (
//         <p className="text-center">{t("loading")}</p>
//       ) : recipes.length === 0 ? (
//         <p className="text-center text-gray-500">{t("noResults")}</p>
//       ) : (
//         <motion.div
//           className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
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

// export default SmartSuggestions;

import React, { useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function SmartSuggestions() {
  const { t, i18n } = useTranslation();
  const [mood, setMood] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [servings, setServings] = useState(2);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const availableIngredients = [
    "بيض", "دقيق", "سكر", "ملح", "زيت", "بصل", "طماطم",
    "لحم", "دجاج", "حليب", "زبدة", "ماء", "ثوم", "أرز", "كمون"
  ];

  const handleCheckboxChange = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood || selectedIngredients.length === 0 || servings < 1) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/recipes/smart-suggestions", {
        mood,
        ingredients: selectedIngredients,
        servings,
      });
      setRecipes(res.data);
    } catch (err) {
      console.error("Error fetching smart suggestions:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* 🌍 Language Switch */}
      <div className="flex justify-end gap-2 mb-6">
        <button onClick={() => i18n.changeLanguage("en")} className="text-sm text-gray-600 hover:text-green-600">🇺🇸 EN</button>
        <button onClick={() => i18n.changeLanguage("fr")} className="text-sm text-gray-600 hover:text-green-600">🇫🇷 FR</button>
        <button onClick={() => i18n.changeLanguage("ar")} className="text-sm text-gray-600 hover:text-green-600">🇲🇦 AR</button>
      </div>

      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
        🧠 {t("moodTitle")}
      </h2>

      {/* 🧾 Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-6">
        {/* 🎭 Mood */}
        <div>
          <label className="block mb-2 font-medium">{t("selectMood")}:</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            required
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">{t("chooseMood")}</option>
            <option value="hungry">😋 {t("moods.hungry")}</option>
            <option value="light">🧘 {t("moods.light")}</option>
            <option value="sweet">🍬 {t("moods.sweet")}</option>
            <option value="quick">⏱️ {t("moods.quick")}</option>
            <option value="fancy">🍽️ {t("moods.fancy")}</option>
          </select>
        </div>

        {/* 🧂 Ingredients */}
        <div>
          <label className="block mb-2 font-medium">{t("selectIngredients")}:</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {availableIngredients.map((ingredient) => (
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

        {/* 👥 Servings */}
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

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition"
        >
          🔍 {t("suggest")}
        </button>
      </form>

      {/* 📦 Results */}
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
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default SmartSuggestions;

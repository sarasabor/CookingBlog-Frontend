// import React from "react";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getRecipeById } from "../services/api";
// import { motion } from "framer-motion";

// function RecipeDetails() {
//   const { id } = useParams();
//   const [recipe, setRecipe] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const data = await getRecipeById(id);
//         setRecipe(data);
//       } catch (error) {
//         console.error("Error fetching recipe details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipe();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex justify-center mt-20">
//         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-green-500"></div>
//       </div>
//     );
//   }

//   if (!recipe) {
//     return <p className="text-center text-gray-500 mt-10">Recipe not found.</p>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-10">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white rounded-2xl shadow-lg overflow-hidden"
//       >
//         <img
//           src={recipe.image}
//           alt={recipe.title}
//           className="w-full h-64 object-cover"
//         />
//         <div className="p-6">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">{recipe.title}</h2>
//           <p className="text-gray-600 mb-4">By {recipe.userId?.username || "Unknown"}</p>

//           <div className="flex items-center gap-2 text-yellow-500 mb-4">
//             <span className="text-sm font-medium text-gray-600">Rating:</span>
//             <span className="text-lg">⭐ {recipe.averageRating || "N/A"}</span>
//           </div>

//           <p className="text-gray-700 leading-relaxed whitespace-pre-line">
//             {recipe.description}
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default RecipeDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById, getReviewsByRecipe } from "../services/api";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

function RecipeDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (error) {
        console.error("Error loading recipe:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await getReviewsByRecipe(id);
        setReviews(res);
      } catch (error) {
        console.error("Error loading reviews:", error);
      }
    };

    Promise.all([fetchData(), fetchReviews()]).finally(() =>
      setLoading(false)
    );
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-green-500"></div>
      </div>
    );
  }

  if (!recipe) {
    return <p className="text-center text-gray-500 mt-10">{t("recipe.notFound")}</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h2 className="text-3xl font-bold text-[#2d4032] mb-2">
            {recipe.title}
          </h2>
          <p className="text-gray-600 mb-3">
            {t("recipe.by")} {recipe.userId?.username || t("recipe.unknown")}
          </p>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium text-gray-600">
              {t("recipe.rating")}:
            </span>
            <span className="text-yellow-500 text-lg">
              ⭐ {recipe.averageRating || "N/A"}
            </span>
          </div>

          <p className="text-gray-700 whitespace-pre-line leading-relaxed mb-4">
            {recipe.description}
          </p>

          <div className="text-sm text-gray-700 space-y-2">
            <p>
              <strong>{t("recipe.ingredients")}:</strong>{" "}
              {recipe.ingredients}
            </p>
            <p>
              <strong>{t("recipe.instructions")}:</strong>{" "}
              {recipe.instructions}
            </p>
            <p>
              <strong>{t("recipe.cookTime")}:</strong>{" "}
              {recipe.cookTime} {t("recipe.minutes")}
            </p>
            <p>
              <strong>{t("recipe.difficulty")}:</strong> {recipe.difficulty}
            </p>
            <p>
              <strong>{t("recipe.mood")}:</strong>{" "}
              {t(`addRecipe.fields.${recipe.mood}`)}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Reviews */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-[#2d4032] mb-4">
          🗨️ {t("recipe.reviews")}
        </h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">{t("recipe.noReviews")}</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-gray-50 border rounded-xl p-4 shadow-sm"
              >
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">
                    {review.username || t("recipe.user")}
                  </span>{" "}
                  {t("recipe.says")}:
                </p>
                <p className="text-gray-600 italic">"{review.comment}"</p>
                <p className="text-yellow-500 text-sm mt-1">
                  ⭐ {review.rating}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeDetails;

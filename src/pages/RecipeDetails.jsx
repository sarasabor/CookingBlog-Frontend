// import React, { useEffect, useState, useContext } from "react";
// import { useParams } from "react-router-dom";
// import api from "../services/api";
// import { useTranslation } from "react-i18next";
// import { AuthContext } from "../context/AuthContext";

// function RecipeDetails() {
//   const { t, i18n } = useTranslation("recipeDetails");
//   const currentLang = i18n.language;
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);

//   const [recipe, setRecipe] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [newRating, setNewRating] = useState(0);
//   const [newComment, setNewComment] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     const fetchRecipeDetails = async () => {
//       try {
//         const res = await api.get(`/recipes/with-reviews/${id}`);
//         setRecipe(res.data);
//       } catch (err) {
//         console.error("❌", t("apiError"), err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRecipeDetails();
//   }, [id, t]);

//   const handleRatingSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) return alert(t("loginToRate"));
//     if (newRating < 1 || newRating > 5) return alert(t("selectStarsWarning"));

//     try {
//       setSubmitting(true);
//       await api.post(`/reviews/${id}`, {
//         rating: newRating,
//         comment: newComment,
//       });
//       setNewRating(0);
//       setNewComment("");
//       const res = await api.get(`/recipes/with-reviews/${id}`);
//       setRecipe(res.data);
//     } catch (err) {
//       console.error("❌ Error submitting rating:", err.response?.data || err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) return <p className="text-center py-10">⏳ {t("loading")}</p>;
//   if (!recipe) return <p className="text-center text-red-500">❌ {t("notFound")}</p>;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-10">

//       <h1 className="text-3xl font-bold text-[#2d4032] mb-4">
//         {(recipe.title && recipe.title[currentLang]) || t("unknown")}
//       </h1>

//       {recipe.image && (
//         <img
//           src={recipe.image}
//           alt={recipe.title?.[currentLang] || t("unknown")}
//           className="w-full h-64 object-cover rounded-lg shadow mb-4"
//         />
//       )}
//       <div className="mb-3 text-gray-600 text-sm flex flex-wrap gap-2">
//         <span>🧠 {t(`moods.${recipe.mood}`)}</span>
//         <span>· 🕒 {recipe.cookTime} {t("minutes")}</span>
//         <span>· 🎯 {t(`difficultyLevels.${recipe.difficulty?.toLowerCase() || "easy"}`)}</span>
//       </div>

//       {recipe.averageRating !== undefined && (
//         <p className="text-sm text-yellow-600 font-medium mb-4">
//           ⭐ {recipe.averageRating != null ? `${recipe.averageRating.toFixed(1)} / 5` : t("noRating")}
//         </p>
//       )}

//       <section className="mb-6">
//         <h3 className="text-lg font-semibold mb-2">📋 {t("ingredientsTitle")}</h3>
//         <ul className="list-disc list-inside text-gray-800">
//           {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 ? (
//             recipe.ingredients.map((ing, idx) =>
//               ing.name?.[currentLang] ? (
//                 <li key={idx}>
//                   {ing.name[currentLang]} {ing.quantity && `- ${ing.quantity}`}
//                 </li>
//               ) : null
//             )
//           ) : (
//             <p className="text-sm text-gray-500">{t("noTags")}</p>
//           )}
//         </ul>
//       </section>

//       <section className="mb-6">
//         <h3 className="text-lg font-semibold mb-2">👨‍🍳 {t("instructionsTitle")}</h3>
//         <p className="text-gray-800 whitespace-pre-line">
//           {recipe.instructions?.[currentLang] || t("unknown")}
//         </p>
//       </section>

//       <section className="mb-6">
//         <h3 className="text-lg font-semibold mb-2">📝 {t("userReviews")}</h3>
//         {recipe.reviews?.length > 0 ? (
//           recipe.reviews.map((rev) => (
//             <div key={rev._id} className="border rounded p-3 mb-3 shadow">
//               <p className="text-sm font-semibold">⭐ {rev.rating} / 5</p>
//               <p className="text-sm text-gray-700">{rev.comment}</p>
//               <p className="text-xs text-gray-400 mt-1">
//                 {new Date(rev.createdAt).toLocaleDateString()}
//               </p>
//             </div>
//           ))
//         ) : (
//           <p className="text-sm text-gray-500">{t("noReviews")}</p>
//         )}
//       </section>

//       {user && (
//         <form onSubmit={handleRatingSubmit} className="bg-gray-100 p-4 rounded-lg shadow">
//           <h3 className="text-lg font-semibold mb-2">{t("addYourRating")}</h3>

//           <div className="flex items-center gap-2 mb-3">
//             <label htmlFor="rating" className="text-sm">{t("stars")}</label>
//             <select
//               id="rating"
//               value={newRating}
//               onChange={(e) => setNewRating(Number(e.target.value))}
//               className="border rounded px-2 py-1"
//               required
//             >
//               <option value="">{t("choose")}</option>
//               {[1, 2, 3, 4, 5].map((r) => (
//                 <option key={r} value={r}>{r}</option>
//               ))}
//             </select>
//           </div>

//           <textarea
//             placeholder={t("commentPlaceholder")}
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             className="w-full h-24 border rounded px-3 py-2 text-sm mb-3"
//           />

//           <button
//             type="submit"
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
//             disabled={submitting}
//           >
//             {submitting ? t("submitting") : t("submit")}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default RecipeDetails;


import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";

function RecipeDetails() {
  const { t, i18n } = useTranslation("recipeDetails");
  const lang = i18n.language.slice(0, 2); // ✅ دعم en, fr, ar فقط
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const res = await api.get(`/recipes/with-reviews/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.error("❌", t("apiError"), err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipeDetails();
  }, [id, t]);

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert(t("loginToRate"));
    if (newRating < 1 || newRating > 5) return alert(t("selectStarsWarning"));

    try {
      setSubmitting(true);
      await api.post(`/reviews/${id}`, {
        rating: newRating,
        comment: newComment,
      });
      setNewRating(0);
      setNewComment("");
      const res = await api.get(`/recipes/with-reviews/${id}`);
      setRecipe(res.data);
    } catch (err) {
      console.error("❌ Error submitting rating:", err.response?.data || err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 animate-spin rounded-full border-4 border-gray-200 border-t-[#567158]"></div>
        <p className="text-gray-600">{t("loading")}</p>
      </div>
    </div>
  );
  
  if (!recipe) return (
    <div className="text-center py-20">
      <div className="text-6xl mb-4">🔍</div>
      <p className="text-red-500 text-lg font-medium">{t("notFound")}</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        {recipe.image && (
          <img
            src={recipe.image}
            alt={recipe.title?.[lang] || t("unknown")}
            className="w-full h-80 object-cover"
          />
        )}
        
        <div className="p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#567158] mb-6">
            {(recipe.title && recipe.title[lang]) || t("unknown")}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
              <span className="text-2xl">🎭</span>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Humeur</p>
                <p className="font-medium text-gray-800 capitalize">{t(`moods.${recipe.mood}`)}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
              <span className="text-2xl">⏱️</span>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Temps</p>
                <p className="font-medium text-gray-800">{recipe.cookTime} {t("minutes")}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
              <span className="text-2xl">📊</span>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Difficulté</p>
                <p className="font-medium text-gray-800 capitalize">{t(`difficultyLevels.${recipe.difficulty?.toLowerCase() || "easy"}`)}</p>
              </div>
            </div>
          </div>

          {recipe.averageRating !== undefined && (
            <div className="flex items-center gap-3 bg-yellow-50 p-4 rounded-xl mb-6">
              <span className="text-2xl">⭐</span>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Note</p>
                <p className="font-medium text-yellow-700">
                  {recipe.averageRating != null ? `${recipe.averageRating.toFixed(1)} / 5` : t("noRating")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Ingredients */}
        <section className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🥘</span>
            <h3 className="text-xl font-bold text-[#567158]">{t("ingredientsTitle")}</h3>
          </div>
          <ul className="space-y-3">
            {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 ? (
              recipe.ingredients.map((ing, idx) =>
                ing.name?.[lang] ? (
                  <li key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="w-2 h-2 bg-[#567158] rounded-full flex-shrink-0"></span>
                    <span className="text-gray-800 font-medium">
                      {ing.name[lang]} {ing.quantity && <span className="text-gray-500">- {ing.quantity}</span>}
                    </span>
                  </li>
                ) : null
              )
            ) : (
              <p className="text-gray-500 italic">{t("noTags")}</p>
            )}
          </ul>
        </section>

        {/* Instructions */}
        <section className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">👩‍🍳</span>
            <h3 className="text-xl font-bold text-[#567158]">{t("instructionsTitle")}</h3>
          </div>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-800 leading-relaxed whitespace-pre-line">
              {recipe.instructions?.[lang] || t("unknown")}
            </p>
          </div>
        </section>
      </div>

      <section className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">💬</span>
          <h3 className="text-xl font-bold text-[#567158]">{t("userReviews")}</h3>
        </div>
        <div className="space-y-4">
          {recipe.reviews?.length > 0 ? (
            recipe.reviews.map((rev) => (
              <div key={rev._id} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">⭐</span>
                  <span className="font-semibold text-gray-800">{rev.rating} / 5</span>
                </div>
                <p className="text-gray-700 mb-2 leading-relaxed">{rev.comment}</p>
                <p className="text-xs text-gray-500 font-medium">
                  {new Date(rev.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <span className="text-4xl mb-2 block">📝</span>
              <p className="text-gray-500 italic">{t("noReviews")}</p>
            </div>
          )}
        </div>
      </section>

      {user && (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">✍️</span>
            <h3 className="text-xl font-bold text-[#567158]">{t("addYourRating")}</h3>
          </div>
          
          <form onSubmit={handleRatingSubmit} className="space-y-4">

            <div>
              <label htmlFor="rating" className="block mb-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                ⭐ {t("stars")}
              </label>
              <div className="relative">
                <select
                  id="rating"
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="w-full appearance-none bg-gray-50 rounded-xl p-3 pr-12 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#567158]/20 transition-all duration-200 text-gray-700 font-medium shadow-sm"
                  required
                >
                  <option value="">{t("choose")}</option>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>{r} ⭐</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                💭 {t("commentPlaceholder")}
              </label>
              <textarea
                placeholder={t("commentPlaceholder")}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full h-24 bg-gray-50 rounded-xl p-4 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#567158]/20 transition-all duration-200 text-gray-700 shadow-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className={`btn-primary ${submitting ? 'btn-loading' : ''}`}
              disabled={submitting}
            >
              {submitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  {t("submitting")}
                </div>
              ) : (
                <>✨ {t("submit")}</>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;

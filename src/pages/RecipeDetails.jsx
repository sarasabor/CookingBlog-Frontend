import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";

function RecipeDetails() {
  const { t, i18n } = useTranslation("recipeDetails");
  const currentLang = i18n.language;
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

  if (loading) return <p className="text-center py-10">⏳ {t("loading")}</p>;
  if (!recipe) return <p className="text-center text-red-500">❌ {t("notFound")}</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold text-[#2d4032] mb-4">
        {(recipe.title && recipe.title[currentLang]) || t("unknown")}
      </h1>

      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title?.[currentLang] || t("unknown")}
          className="w-full h-64 object-cover rounded-lg shadow mb-4"
        />
      )}
      <div className="mb-3 text-gray-600 text-sm flex flex-wrap gap-2">
        <span>🧠 {t(`moods.${recipe.mood}`)}</span>
        <span>· 🕒 {recipe.cookTime} {t("minutes")}</span>
        <span>· 🎯 {t(`difficultyLevels.${recipe.difficulty?.toLowerCase() || "easy"}`)}</span>
      </div>

      {recipe.averageRating !== undefined && (
        <p className="text-sm text-yellow-600 font-medium mb-4">
          ⭐ {recipe.averageRating != null ? `${recipe.averageRating.toFixed(1)} / 5` : t("noRating")}
        </p>
      )}

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">📋 {t("ingredientsTitle")}</h3>
        <ul className="list-disc list-inside text-gray-800">
          {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 ? (
            recipe.ingredients.map((ing, idx) =>
              ing.name?.[currentLang] ? (
                <li key={idx}>
                  {ing.name[currentLang]} {ing.quantity && `- ${ing.quantity}`}
                </li>
              ) : null
            )
          ) : (
            <p className="text-sm text-gray-500">{t("noTags")}</p>
          )}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">👨‍🍳 {t("instructionsTitle")}</h3>
        <p className="text-gray-800 whitespace-pre-line">
          {recipe.instructions?.[currentLang] || t("unknown")}
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">📝 {t("userReviews")}</h3>
        {recipe.reviews?.length > 0 ? (
          recipe.reviews.map((rev) => (
            <div key={rev._id} className="border rounded p-3 mb-3 shadow">
              <p className="text-sm font-semibold">⭐ {rev.rating} / 5</p>
              <p className="text-sm text-gray-700">{rev.comment}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(rev.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">{t("noReviews")}</p>
        )}
      </section>

      {user && (
        <form onSubmit={handleRatingSubmit} className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">{t("addYourRating")}</h3>

          <div className="flex items-center gap-2 mb-3">
            <label htmlFor="rating" className="text-sm">{t("stars")}</label>
            <select
              id="rating"
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
              className="border rounded px-2 py-1"
              required
            >
              <option value="">{t("choose")}</option>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <textarea
            placeholder={t("commentPlaceholder")}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full h-24 border rounded px-3 py-2 text-sm mb-3"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? t("submitting") : t("submit")}
          </button>
        </form>
      )}
    </div>
  );
}

export default RecipeDetails;

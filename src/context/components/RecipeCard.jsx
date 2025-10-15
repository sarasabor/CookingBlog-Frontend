import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthProvider";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";





function RecipeCard({ recipe, hideFavoriteButton = false }) {
  const { t, i18n } = useTranslation("recipeDetails");
  const lang = i18n.language.slice(0, 2); // ✅ دعم en, fr, ar فقط
  const navigate = useNavigate();

  const imageSrc = recipe.image || "https://via.placeholder.com/400x200?text=No+Image";
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user?.favorites?.includes(recipe._id)) {
      setIsFavorite(true);
    }
  }, [user, recipe._id]);

  const handleFavoriteClick = async (e) => {
    e.stopPropagation(); 
    if (!user) {
      toast.warn(t("loginToRate"));
      return;
    }

    try {
      if (isFavorite) {
        await api.delete(`/users/favorites/${recipe._id}`);
        setIsFavorite(false);
        toast.info(t("unsave"));
      } else {
        await api.post(`/users/favorites/${recipe._id}`);
        setIsFavorite(true);
        toast.success(t("save"));
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error updating favorites");
    }
  };

  const handleCardClick = () => {
    navigate(`/recipes/${recipe._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-transform duration-200 hover:scale-105"
    >
      <img
        src={imageSrc}
        alt={recipe.title?.[lang] || t("unknown")}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          {recipe.title?.[lang] || t("unknown")}
        </h3>

        <p className="text-sm text-gray-500 mt-1 mb-1">
          <span className="capitalize font-medium">{t(`moods.${recipe.mood}`)}</span>
        </p>

        <p className="text-sm text-gray-500 mb-1">
          <span className="font-medium">{recipe.cookTime} {t("minutes")}</span> · <span className="capitalize">{t(`difficultyLevels.${recipe.difficulty?.toLowerCase() || "easy"}`)}</span>
        </p>

        <p className="text-sm text-gray-500 mb-2 truncate">
          {recipe.tags?.length ? recipe.tags.join(", ") : t("noTags")}
        </p>

        <div className="flex justify-end">
          {!hideFavoriteButton && (
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full transition-colors ${
                isFavorite 
                  ? 'text-red-500 hover:bg-red-50' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
              title={isFavorite ? t("unsave") : t("save")}
            >
              <svg 
                className="w-5 h-5" 
                fill={isFavorite ? "currentColor" : "none"} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;

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
      className="overflow-hidden cursor-pointer card card-hover group"
    >
      {/* Image */}
      <div className="relative mb-4 -m-6 overflow-hidden rounded-xl">
        <img
          src={imageSrc}
          alt={recipe.title?.[lang] || t("unknown")}
          className="object-cover w-full h-56 transition-transform duration-500 group-hover:scale-110"
        />
        {!hideFavoriteButton && (
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-4 right-4 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg hover:scale-110 ${
              isFavorite 
                ? 'bg-red-500/90 text-white hover:bg-red-600' 
                : 'bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white'
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

      {/* Content */}
      <div className="pt-2">
        <h3 className="text-xl font-bold text-[#567158] mb-3 line-clamp-2 group-hover:text-[#4a5d4b] transition-colors">
          {recipe.title?.[lang] || t("unknown")}
        </h3>

        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <span className="flex items-center gap-1.5 font-medium">
            <svg className="w-4 h-4 text-[#567158]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {recipe.cookTime} {t("minutes")}
          </span>
          <span className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full text-xs font-semibold text-gray-700">
            {t(`difficultyLevels.${recipe.difficulty?.toLowerCase() || "easy"}`)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="px-3 py-1.5 bg-gradient-to-r from-[#567158]/10 to-[#567158]/5 text-[#567158] rounded-full text-xs font-semibold border border-[#567158]/20">
            {t(`moods.${recipe.mood}`)}
          </span>
          {recipe.averageRating > 0 && (
            <div className="flex items-center text-sm font-semibold text-gray-700 bg-amber-50 px-2.5 py-1 rounded-full">
              <svg className="w-4 h-4 mr-1 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {recipe.averageRating.toFixed(1)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;

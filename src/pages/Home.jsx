import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Home() {
  const { t, i18n } = useTranslation("home");
  const isRTL = i18n.language === 'ar';

  return (
    <div className={`min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-[#567158] mb-6 leading-tight">
            {t("welcome")}
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <Link
            to="/recipes"
            className="btn-primary btn-large card-hover"
          >
            {t("browse")}
          </Link>
          
          <Link
            to="/mood-suggestions"
            className="btn-outline btn-large card-hover"
          >
            {t("moodSuggestions")}
          </Link>
          
                 <Link
                   to="/smart-suggestions"
                   className="btn-outline btn-large card-hover"
                 >
                   {t("smartSearch")}
                 </Link>

                 <Link
                   to="/mood-science"
                   className="btn-outline btn-large card-hover"
                 >
                   {t("science")}
                 </Link>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="card card-hover text-center">
            <div className="text-4xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-[#567158] mb-3">{t("features.richRecipes")}</h3>
            <p className="text-gray-600">{t("features.richRecipesDesc")}</p>
          </div>

          <div className="card card-hover text-center">
            <div className="text-4xl mb-4">😊</div>
            <h3 className="text-xl font-semibold text-[#567158] mb-3">{t("features.moodBased")}</h3>
            <p className="text-gray-600">{t("features.moodBasedDesc")}</p>
          </div>

          <div className="card card-hover text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-[#567158] mb-3">{t("features.smartSearch")}</h3>
            <p className="text-gray-600">{t("features.smartSearchDesc")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;


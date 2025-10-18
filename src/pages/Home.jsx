import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Home() {
  const { t, i18n } = useTranslation("home");
  const isRTL = i18n.language === 'ar';

  return (
    <div className={`min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-5xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="inline-block p-4 mb-6 rounded-full shadow-lg bg-white/50 backdrop-blur-sm">
            <img 
              src="/favicon.gif" 
              alt="MoodBite Kitchen" 
              className="w-20 h-20 border rounded-full md:w-24 md:h-24"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#567158] to-[#4a5d4b] bg-clip-text text-transparent mb-6 leading-tight">
            {t("welcome")}
          </h1>
          <p className="max-w-3xl mx-auto text-lg font-medium leading-relaxed text-gray-700 md:text-2xl">
            {t("description")}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-4 mb-12 sm:grid-cols-2 lg:grid-cols-4">
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
        <div className="grid grid-cols-1 gap-8 mt-20 md:grid-cols-3">
          <div className="text-center card card-hover group">
            <div className="mb-6 text-5xl transition-transform duration-300 transform group-hover:scale-110">🍽️</div>
            <h3 className="text-xl font-bold text-[#567158] mb-3 group-hover:text-[#4a5d4b] transition-colors">{t("features.richRecipes")}</h3>
            <p className="leading-relaxed text-gray-600">{t("features.richRecipesDesc")}</p>
          </div>

          <div className="text-center card card-hover group">
            <div className="mb-6 text-5xl transition-transform duration-300 transform group-hover:scale-110">😊</div>
            <h3 className="text-xl font-bold text-[#567158] mb-3 group-hover:text-[#4a5d4b] transition-colors">{t("features.moodBased")}</h3>
            <p className="leading-relaxed text-gray-600">{t("features.moodBasedDesc")}</p>
          </div>

          <div className="text-center card card-hover group">
            <div className="mb-6 text-5xl transition-transform duration-300 transform group-hover:scale-110">🔍</div>
            <h3 className="text-xl font-bold text-[#567158] mb-3 group-hover:text-[#4a5d4b] transition-colors">{t("features.smartSearch")}</h3>
            <p className="leading-relaxed text-gray-600">{t("features.smartSearchDesc")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;


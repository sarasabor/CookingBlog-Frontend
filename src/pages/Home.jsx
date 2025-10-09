import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Home() {
  const { t, i18n } = useTranslation("home");

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-[#567158] mb-6">
        {t("welcome")}
      </h1>

      <p className="text-gray-600 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
        {t("description")}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/recipes"
          className="btn-primary btn-large"
        >
          {t("browse")}
        </Link>
        
        <Link
          to="/suggestions/mood"
          className="btn-outline btn-large"
        >
          {t("moodSuggestions")}
        </Link>
      </div>
    </div>
  );
}

export default Home;


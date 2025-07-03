import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Home() {
  const { t, i18n } = useTranslation("home");

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
        {t("welcome")}
      </h1>

      <p className="text-gray-700 text-lg max-w-xl mb-6">
        {t("description")}
      </p>

      <Link
        to="/recipes"
        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition"
      >
        {t("browse")}
      </Link>
    </div>
  );
}

export default Home;


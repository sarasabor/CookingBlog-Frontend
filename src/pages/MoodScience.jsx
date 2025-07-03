import React from "react";
import { useTranslation } from "react-i18next";

function MoodScience() {
  const { t } = useTranslation("moodScience");

  return (
    <section className="max-w-5xl mx-auto px-4 py-16 text-gray-800 animate-fade-in" id="why-mood-suggestions">
      <h2 className="text-3xl font-bold text-[#2d4032] mb-6 text-center">🧠🌿 {t("title")}</h2>

      <p className="mb-4 leading-relaxed">{t("intro")}</p>
      <p className="mb-4 leading-relaxed">{t("science")}</p>
      <p className="mb-4 leading-relaxed">{t("lightMood")}</p>
      <p className="mb-4 leading-relaxed">{t("studies")}</p>

      <h3 className="text-xl font-semibold text-[#2d4032] mb-3">🍽️ {t("howItWorks")}</h3>
      <p className="mb-4 leading-relaxed">{t("explanation")}</p>

      <ul className="list-disc list-inside space-y-2 mb-6">
        <li>{t("hungry")}</li>
        <li>{t("sad")}</li>
        <li>{t("stressed")}</li>
        <li>{t("tired")}</li>
        <li>{t("relaxed")}</li>
        <li>{t("happy")}</li>
        <li>{t("bored")}</li>
        <li>{t("anxious")}</li>
        <li>{t("energetic")}</li>
        <li>{t("romantic")}</li>
      </ul>
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded text-sm">
        📌 <strong>{t("notePrefix")}</strong> {t("notes")}
      </div>
    </section>
  );
}

export default MoodScience;

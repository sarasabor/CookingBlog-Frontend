import React from "react";
import { useTranslation } from "react-i18next";

function MoodScience() {
  const { t, i18n } = useTranslation("moodScience");
  const isRTL = i18n.language === 'ar';

  return (
    <section 
      className={`max-w-5xl mx-auto px-4 py-16 text-gray-800 animate-fade-in ${isRTL ? 'rtl' : 'ltr'}`} 
      id="why-mood-suggestions"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="p-8 bg-white shadow-lg rounded-xl">
        <h2 className={`text-3xl font-bold text-[#567158] mb-8 text-center`}>
          <span className="mr-2 text-2xl">🧠</span>
          {t("title")}
        </h2>

        <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          <p className="text-lg leading-relaxed text-gray-700">{t("intro")}</p>
          <p className="leading-relaxed text-gray-700">{t("science")}</p>
          <p className="leading-relaxed text-gray-700">{t("lightMood")}</p>
          <p className="leading-relaxed text-gray-700">{t("studies")}</p>
        </div>

        <div className="mt-8">
          <h3 className={`text-xl font-semibold text-[#567158] mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            <span className="mr-2 text-2xl">🍽️</span>
            {t("howItWorks")}
          </h3>
          <p className={`mb-6 leading-relaxed text-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t("explanation")}
          </p>
        </div>

        <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <li className={`flex items-center gap-3 bg-gray-50 p-3 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-lg">🍽️</span>
            <span>{t("hungry")}</span>
          </li>
          <li className={`flex items-center gap-3 bg-gray-50 p-3 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-lg">😢</span>
            <span>{t("sad")}</span>
          </li>
          <li className={`flex items-center gap-3 bg-gray-50 p-3 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-lg">😰</span>
            <span>{t("stressed")}</span>
          </li>
          <li className={`flex items-center gap-3 bg-gray-50 p-3 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-lg">😴</span>
            <span>{t("tired")}</span>
          </li>
          <li className={`flex items-center gap-3 bg-gray-50 p-3 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-lg">😌</span>
            <span>{t("relaxed")}</span>
          </li>
          <li className={`flex items-center gap-3 bg-gray-50 p-3 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-lg">😊</span>
            <span>{t("happy")}</span>
          </li>
          <li className={`flex items-center gap-3 bg-gray-50 p-3 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-lg">😑</span>
            <span>{t("bored")}</span>
          </li>
          <li className={`flex items-center gap-3 bg-gray-50 p-3 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-lg">😟</span>
            <span>{t("anxious")}</span>
          </li>
          <li className={`flex items-center gap-3 bg-gray-50 p-3 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-lg">⚡</span>
            <span>{t("energetic")}</span>
          </li>
          <li className={`flex items-center gap-3 bg-gray-50 p-3 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-lg">💕</span>
            <span>{t("romantic")}</span>
          </li>
        </ul>
        
        <div className={`bg-yellow-50 p-6 rounded-xl shadow-sm ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-2xl">💡</span>
            <div>
              <strong className="font-semibold text-yellow-800">{t("notePrefix")}</strong>
              <p className="mt-1 text-yellow-700">{t("notes")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MoodScience;

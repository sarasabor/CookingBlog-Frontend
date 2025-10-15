import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enHome from '../public/locales/en/home.json';
import enRecipes from '../public/locales/en/recipes.json';
import enLayout from '../public/locales/en/layout.json';
import enFavorites from '../public/locales/en/favorites.json';
import enMoodScience from '../public/locales/en/moodScience.json';
import enMoodSuggestions from '../public/locales/en/moodSuggestions.json';
import enSmartSuggestions from '../public/locales/en/smartSuggestions.json';

import frHome from '../public/locales/fr/home.json';
import frRecipes from '../public/locales/fr/recipes.json';
import frFavorites from '../public/locales/fr/favorites.json';
import frMoodScience from '../public/locales/fr/moodScience.json';
import frMoodSuggestions from '../public/locales/fr/moodSuggestions.json';
import frSmartSuggestions from '../public/locales/fr/smartSuggestions.json';

import arHome from '../public/locales/ar/home.json';
import arRecipes from '../public/locales/ar/recipes.json';
import arLayout from '../public/locales/ar/layout.json';
import arFavorites from '../public/locales/ar/favorites.json';
import arMoodScience from '../public/locales/ar/moodScience.json';
import arMoodSuggestions from '../public/locales/ar/moodSuggestions.json';
import arSmartSuggestions from '../public/locales/ar/smartSuggestions.json';

const resources = {
  en: {
    home: enHome,
    recipes: enRecipes,
    layout: enLayout,
    favorites: enFavorites,
    moodScience: enMoodScience,
    moodSuggestions: enMoodSuggestions,
    smartSuggestions: enSmartSuggestions,
  },
  fr: {
    home: frHome,
    recipes: frRecipes,
    favorites: frFavorites,
    moodScience: frMoodScience,
    moodSuggestions: frMoodSuggestions,
    smartSuggestions: frSmartSuggestions,
  },
  ar: {
    home: arHome,
    recipes: arRecipes,
    layout: arLayout,
    favorites: arFavorites,
    moodScience: arMoodScience,
    moodSuggestions: arMoodSuggestions,
    smartSuggestions: arSmartSuggestions,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    ns: ['home', 'recipes', 'layout', 'favorites', 'moodScience', 'moodSuggestions', 'smartSuggestions'],
    defaultNS: 'home',
  });

export default i18n;

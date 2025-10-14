import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enHome from '../public/locales/en/home.json';
import enRecipes from '../public/locales/en/recipes.json';
import enLayout from '../public/locales/en/layout.json';
import enFavorites from '../public/locales/en/favorites.json';

import frHome from '../public/locales/fr/home.json';
import frRecipes from '../public/locales/fr/recipes.json';
import frFavorites from '../public/locales/fr/favorites.json';

import arHome from '../public/locales/ar/home.json';
import arRecipes from '../public/locales/ar/recipes.json';
import arLayout from '../public/locales/ar/layout.json';
import arFavorites from '../public/locales/ar/favorites.json';

const resources = {
  en: {
    home: enHome,
    recipes: enRecipes,
    layout: enLayout,
    favorites: enFavorites,
  },
  fr: {
    home: frHome,
    recipes: frRecipes,
    favorites: frFavorites,
  },
  ar: {
    home: arHome,
    recipes: arRecipes,
    layout: arLayout,
    favorites: arFavorites,
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
    ns: ['home', 'recipes', 'layout', 'favorites'],
    defaultNS: 'home',
  });

export default i18n;

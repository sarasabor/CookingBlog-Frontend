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
import enLogin from '../public/locales/en/login.json';
import enRegister from '../public/locales/en/register.json';
import enRecipeDetails from '../public/locales/en/recipeDetails.json';
import enAddRecipe from '../public/locales/en/addRecipe.json';

import frHome from '../public/locales/fr/home.json';
import frRecipes from '../public/locales/fr/recipes.json';
import frLayout from '../public/locales/fr/layout.json';
import frFavorites from '../public/locales/fr/favorites.json';
import frMoodScience from '../public/locales/fr/moodScience.json';
import frMoodSuggestions from '../public/locales/fr/moodSuggestions.json';
import frSmartSuggestions from '../public/locales/fr/smartSuggestions.json';
import frLogin from '../public/locales/fr/login.json';
import frRegister from '../public/locales/fr/register.json';
import frRecipeDetails from '../public/locales/fr/recipeDetails.json';
import frAddRecipe from '../public/locales/fr/addRecipe.json';

import arHome from '../public/locales/ar/home.json';
import arRecipes from '../public/locales/ar/recipes.json';
import arLayout from '../public/locales/ar/layout.json';
import arFavorites from '../public/locales/ar/favorites.json';
import arMoodScience from '../public/locales/ar/moodScience.json';
import arMoodSuggestions from '../public/locales/ar/moodSuggestions.json';
import arSmartSuggestions from '../public/locales/ar/smartSuggestions.json';
import arLogin from '../public/locales/ar/login.json';
import arRegister from '../public/locales/ar/register.json';
import arRecipeDetails from '../public/locales/ar/recipeDetails.json';
import arAddRecipe from '../public/locales/ar/addRecipe.json';

const resources = {
  en: {
    home: enHome,
    recipes: enRecipes,
    layout: enLayout,
    favorites: enFavorites,
    moodScience: enMoodScience,
    moodSuggestions: enMoodSuggestions,
    smartSuggestions: enSmartSuggestions,
    login: enLogin,
    register: enRegister,
    recipeDetails: enRecipeDetails,
    addRecipe: enAddRecipe,
  },
  fr: {
    home: frHome,
    recipes: frRecipes,
    layout: frLayout,
    favorites: frFavorites,
    moodScience: frMoodScience,
    moodSuggestions: frMoodSuggestions,
    smartSuggestions: frSmartSuggestions,
    login: frLogin,
    register: frRegister,
    recipeDetails: frRecipeDetails,
    addRecipe: frAddRecipe,
  },
  ar: {
    home: arHome,
    recipes: arRecipes,
    layout: arLayout,
    favorites: arFavorites,
    moodScience: arMoodScience,
    moodSuggestions: arMoodSuggestions,
    smartSuggestions: arSmartSuggestions,
    login: arLogin,
    register: arRegister,
    recipeDetails: arRecipeDetails,
    addRecipe: arAddRecipe,
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
    ns: ['home', 'recipes', 'layout', 'favorites', 'moodScience', 'moodSuggestions', 'smartSuggestions', 'login', 'register', 'recipeDetails', 'addRecipe'],
    defaultNS: 'home',
  });

export default i18n;

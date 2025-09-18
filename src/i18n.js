import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
.use(HttpBackend)
.use(LanguageDetector)
.use(initReactI18next)
.init({
fallbackLng: "en",
supportedLngs: ["en", "fr", "ar"],
debug: false,
load: "languageOnly",
ns: [
"layout",
"home",
"login",
"register",
"addRecipe",
"recipes",
"recipeDetails",
"moodSuggestions",
"smartSuggestions",
"favorites",
"moodScience",
],
defaultNS: "layout",
backend: {
loadPath: "/locales/{{lng}}/{{ns}}.json",
},
detection: {
order: ["localStorage", "navigator", "htmlTag"],
caches: ["localStorage"],
},
interpolation: {
escapeValue: false,
},
react: {
useSuspense: false,
},
});

export default i18n;
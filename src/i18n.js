import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import fr from "./locales/fr.json";
import ar from "./locales/ar.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    ar: { translation: ar },
  },
  lng: "en", // اللغة الافتراضية
  fallbackLng: "en", // إذا ما لقى مفتاح فاللغة المختارة، يرجع لـ en
  interpolation: {
    escapeValue: false, // React بالفعل كيأمن النصوص
  },
});

export default i18n;

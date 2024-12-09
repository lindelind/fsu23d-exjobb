import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en/translation.json";
import svTranslation from "./locales/sv/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    sv: {
      translation: svTranslation,
    },
  },
  lng: "sv",
  interpolation: {
    escapeValue: false, 
  },
});

document.documentElement.lang = i18n.language;
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;

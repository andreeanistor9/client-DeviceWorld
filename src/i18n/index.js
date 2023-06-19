import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationsInEng from "../locales/en/translation.json";
import translationsInRo from "../locales/ro/translation.json";
const resources = {
  en: {
    translation: translationsInEng,
  },
  ro: {
    translation: translationsInRo,
  },
};

i18n
  .use(initReactI18next) 
  .init({
    resources, 
    lng: "ro", 
    debug: true,
    fallbackLng: "en", 
    interpolation: {
      escapeValue: false,
    },
    ns: "translation", 
    defaultNS: "translation",
  });

export default i18n;

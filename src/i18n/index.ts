import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import ptBR from "./locales/ptBR/translation.json";

type translationType = {
    [key: string]: {
        description: string,
        translation: any
    }
}

export const translationLanguages: translationType = {
    en: { description: "🇺🇸 English", translation: en },
    ptBR: { description: "🇧🇷 Português", translation: ptBR }
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: false,
        resources: translationLanguages
    });

export default i18n;
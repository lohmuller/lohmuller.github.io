import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

function Locale() {
    i18n
        .use(LanguageDetector)
        .use(initReactI18next) // passes i18n down to react-i18next
        .init({
            // the translations
            // (tip move them in a JSON file and import them,
            // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
            resources: {
                en: {
                    translation: {
                        "Home": "Home",
                        "About": "About",
                        "Contact": "Contact",
                        "Projects": "Projects",
                        "Change Language": "Change Language",
                        "Xablau": "Mudar o Idioma"
                    }
                },
                pt: {
                    translation: {
                        "Home": "Inicio",
                        "About": "Sobre",
                        "Contact": "Contato",
                        "Projects": "Projetos",
                        "Change Language": "Mudar o Idioma",
                        "Xablau": "Mudar o Idioma"
                    }
                },
                jp: {
                    translation: {
                        "Home": "Homusu",
                        "Change Language": "Go Kaete",
                        "Xablau": "Mudar o Idioma"
                    }
                }
            },
            // lng: "en", // if you're using a language detector, do not define the lng option
            fallbackLng: "en",

            interpolation: {
                escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
            }

        });

    const defaultLanguage: string = i18n.resolvedLanguage ? i18n.resolvedLanguage : "en";
    return defaultLanguage;
}

export default Locale;
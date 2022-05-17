import i18next from "i18next";
import i18nHttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { hydrate } from "react-dom";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { RemixBrowser } from "remix";
import { getInitialNamespaces } from "remix-i18next";
import { i18nInitOptions } from "./entry.common";

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(i18nHttpBackend)
    .init({
        ...i18nInitOptions,
        ns: getInitialNamespaces(),
        backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" },
        detection: {
            order: ["htmlTag"],
            caches: [],
        },
    })
    .then(() => {
        return hydrate(
            <I18nextProvider i18n={i18next}>
                <RemixBrowser />
            </I18nextProvider>,
            document,
        );
    });

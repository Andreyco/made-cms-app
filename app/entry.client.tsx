import i18next from "i18next";
import i18nHttpBackend from "i18next-http-backend";
import { hydrate } from "react-dom";
import { initReactI18next } from "react-i18next";
import { RemixBrowser } from "remix";
import { getInitialNamespaces } from "remix-i18next";
import { i18nInitOptions } from "./entry.common";

i18next
    .use(initReactI18next)
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
        return hydrate(<RemixBrowser />, document);
    });

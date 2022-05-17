import { createInstance } from "i18next";
import i18nFsBackend from "i18next-fs-backend";
import { resolve } from "path";
import { renderToString } from "react-dom/server";
import { I18nextProvider, initReactI18next } from "react-i18next";
import type { EntryContext } from "remix";
import { RemixServer } from "remix";
import { RemixI18Next } from "remix-i18next";
import { i18nInitOptions } from "./entry.common";
import { getSessionData } from "./services/authService.server";

let i18n = new RemixI18Next({
    detection: {
        supportedLanguages: i18nInitOptions.supportedLngs as string[],
        fallbackLanguage: i18nInitOptions.fallbackLng as string,
    },
    i18next: {
        backend: { loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json") },
    },
    backend: i18nFsBackend,
});

export default async function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext,
) {
    let i18nInstance = createInstance();
    let localeNamespace = i18n.getRouteNamespaces(remixContext);
    let language = getSessionData(request)?.language ?? 'en';

    await i18nInstance
        .use(initReactI18next)
        .use(i18nFsBackend)
        .init({
            ...i18nInitOptions,
            lng: language,
            ns: localeNamespace,
            backend: {
                loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json"),
            },
        });

    const markup = renderToString(
        <I18nextProvider i18n={i18nInstance}>
            <RemixServer context={remixContext} url={request.url} />,
        </I18nextProvider>,
    );

    responseHeaders.set("Content-Type", "text/html");

    return new Response("<!DOCTYPE html>" + markup, {
        status: responseStatusCode,
        headers: responseHeaders,
    });
}

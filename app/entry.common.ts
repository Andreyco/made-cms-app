import { InitOptions } from "i18next";

export const i18nInitOptions: Partial<InitOptions> = {
    supportedLngs: ["en", "sk"],
    fallbackLng: "en",
    react: { useSuspense: false },
};

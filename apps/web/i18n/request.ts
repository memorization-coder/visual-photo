import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import enMessages from "../../../packages/copy/locales/en.json";

const messagesByLocale = {
  en: enMessages
} as const;

function isSupportedLocale(locale: string | undefined): locale is keyof typeof messagesByLocale {
  return typeof locale === "string" && (routing.locales as readonly string[]).includes(locale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = isSupportedLocale(requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: messagesByLocale[locale]
  };
});

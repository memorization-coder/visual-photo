const rtlLocales = new Set(["ar", "he", "fa", "ur"]);

export function getLocaleDirection(locale: string): "ltr" | "rtl" {
  return rtlLocales.has(locale) ? "rtl" : "ltr";
}

